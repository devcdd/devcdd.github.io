import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import enquirer from 'enquirer'

const { Select, Input } = enquirer

const ROOT = process.cwd()
const ARTICLES_DIR = path.join(ROOT, 'articles')
const TEMPLATES_DIR = path.join(ROOT, 'templates')

const BLOG_CATEGORIES = [
  { name: 'frontend', message: 'Frontend' },
  { name: 'backend', message: 'Backend' },
  { name: 'retrospect', message: 'Retrospect' },
]

process.on('SIGINT', () => {
  process.stderr.write('\n')
  process.exit(130)
})

process.on('uncaughtException', (error) => {
  if (error?.code === 'ERR_USE_AFTER_CLOSE') {
    process.stderr.write('\n')
    process.exit(130)
  }

  throw error
})

function showHelp() {
  console.log(`Usage:
  pnpm blog
  pnpm image:paste

Flow:
  1. pnpm blog
  2. Select post or paste
  3. post: choose blog/project, choose category if blog, then enter title
  4. paste: choose a recent post/project target, then save clipboard image
`)
}

function parseArgs(argv) {
  const args = [...argv]
  const parsed = {
    command: null,
    name: null,
    dir: null,
    alt: '',
    help: false,
  }

  if (args[0] && !args[0].startsWith('--')) {
    parsed.command = args.shift()
  }

  while (args.length > 0) {
    const arg = args.shift()

    if (arg === '--help' || arg === '-h') {
      parsed.help = true
      continue
    }

    if (arg === '--dir') {
      parsed.dir = args.shift() ?? null
      continue
    }

    if (arg === '--alt') {
      parsed.alt = args.shift() ?? ''
      continue
    }

    if (!arg.startsWith('--') && !parsed.name) {
      parsed.name = arg
    }
  }

  return parsed
}

function sanitizeFileName(value) {
  return value
    .trim()
    .replace(/[\/:\\\n\r\t]+/g, '-')
    .replace(/\s+/g, ' ')
}

function yamlSingleQuoted(value) {
  return `'${value.replaceAll("'", "''")}'`
}

function todayString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  const day = `${now.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function randomStem(length = 12) {
  return crypto.randomUUID().replaceAll('-', '').slice(0, length)
}

function formatRelativeTime(date) {
  const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })
  const seconds = Math.round((date.getTime() - Date.now()) / 1000)
  const units = [
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ]

  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size || unit === 'minute') {
      return formatter.format(Math.round(seconds / size), unit)
    }
  }

  return formatter.format(seconds, 'second')
}

async function walkMdxFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkMdxFiles(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

async function recentTargets(limit = 5) {
  const files = await walkMdxFiles(ARTICLES_DIR)
  const targets = []

  for (const filePath of files) {
    const relative = path.relative(ARTICLES_DIR, filePath)
    const parts = relative.split(path.sep)
    const root = parts[0]

    if (root !== 'blog' && root !== 'project') {
      continue
    }

    const stat = await fs.stat(filePath)
    const rawPath = relative.replace(/\.mdx$/, '').split(path.sep).slice(1).join('/')
    const directoryPrefix = root === 'blog' ? 'posts' : 'projects'
    const directory = path.posix.join(directoryPrefix, rawPath)
    const labelPrefix = root === 'blog' ? 'Post' : 'Project'

    targets.push({
      directory,
      label: `${labelPrefix} · ${rawPath}`,
      modifiedAt: stat.mtime,
    })
  }

  return targets.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime()).slice(0, limit)
}

async function selectMainAction() {
  const prompt = new Select({
    name: 'action',
    message: '무엇을 할까요?',
    choices: [
      { name: 'post', message: 'Post', hint: '새 blog/project mdx 생성' },
      { name: 'paste', message: 'Paste', hint: '클립보드 이미지를 최근 대상에 저장' },
    ],
  })

  return prompt.run()
}

async function selectContentKind() {
  const prompt = new Select({
    name: 'kind',
    message: '어떤 콘텐츠를 만들까요?',
    choices: [
      { name: 'blog', message: 'Blog' },
      { name: 'project', message: 'Project' },
    ],
  })

  return prompt.run()
}

async function selectBlogCategory() {
  const prompt = new Select({
    name: 'category',
    message: '블로그 카테고리를 선택하세요',
    choices: BLOG_CATEGORIES,
  })

  return prompt.run()
}

async function promptTitle() {
  const prompt = new Input({
    name: 'title',
    message: '제목',
    validate(value) {
      return value.trim().length > 0 || '제목을 입력해주세요.'
    },
  })

  return prompt.run()
}

async function promptImageName(initialValue = '') {
  const prompt = new Input({
    name: 'imageName',
    message: '파일명 (비우면 랜덤)',
    initial: initialValue,
    result(value) {
      return value.trim()
    },
  })

  return prompt.run()
}

async function renderTemplate(templateName, replacements) {
  const templatePath = path.join(TEMPLATES_DIR, templateName)
  const content = await fs.readFile(templatePath, 'utf8')

  let output = content
  for (const [placeholder, value] of Object.entries(replacements)) {
    output = output.replaceAll(placeholder, value)
  }

  return output
}

async function createPost() {
  const kind = await selectContentKind()
  const category = kind === 'blog' ? await selectBlogCategory() : null
  const title = await promptTitle()
  const safeTitle = sanitizeFileName(title)

  if (!safeTitle) {
    throw new Error('제목이 비어 있거나 파일명으로 사용할 수 없습니다.')
  }

  const targetDir =
    kind === 'blog'
      ? path.join(ARTICLES_DIR, 'blog', category)
      : path.join(ARTICLES_DIR, 'project')
  const templateName = kind === 'blog' ? 'blog.mdx.tpl' : 'project.mdx.tpl'
  const outputPath = path.join(targetDir, `${safeTitle}.mdx`)

  try {
    await fs.access(outputPath)
    throw new Error(`이미 같은 파일이 존재합니다: ${outputPath}`)
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error
    }
  }

  const content = await renderTemplate(templateName, {
    __TITLE__: yamlSingleQuoted(title),
    __DATE__: todayString(),
  })

  await fs.mkdir(targetDir, { recursive: true })
  await fs.writeFile(outputPath, content, 'utf8')

  console.log(`Created: ${outputPath}`)
}

async function selectPasteTarget(explicitDir) {
  if (explicitDir) {
    return explicitDir
  }

  const targets = await recentTargets()
  if (targets.length === 0) {
    throw new Error('선택할 최근 posts/projects 대상이 없습니다.')
  }

  const prompt = new Select({
    name: 'target',
    message: '이미지를 붙여넣을 대상을 선택하세요',
    choices: targets.map((target) => ({
      name: target.directory,
      message: target.directory,
      hint: `${target.label}, ${formatRelativeTime(target.modifiedAt)}`,
    })),
  })

  return prompt.run()
}

function runClipboardSaver({ dir, name, alt }) {
  const args = ['scripts/save-clipboard-image.swift', '--dir', dir, '--name', name, '--alt', alt]
  const result = spawnSync('swift', args, {
    cwd: ROOT,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

async function pasteImage(parsed) {
  const dir = await selectPasteTarget(parsed.dir)
  let name = parsed.name

  if (!name) {
    const enteredName = await promptImageName('')
    name = enteredName || randomStem()
  }

  name = sanitizeFileName(name) || randomStem()
  runClipboardSaver({ dir, name, alt: parsed.alt ?? '' })
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2))

  if (parsed.help) {
    showHelp()
    return
  }

  if (parsed.command === 'post') {
    await createPost()
    return
  }

  if (parsed.command === 'paste') {
    await pasteImage(parsed)
    return
  }

  const action = await selectMainAction()

  if (action === 'post') {
    await createPost()
    return
  }

  await pasteImage(parsed)
}

main().catch((error) => {
  const message = error?.message ?? '실행 중 오류가 발생했습니다.'
  console.error(message)
  process.exit(1)
})
