import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const ARTICLES_DIR = path.join(ROOT, 'articles')
const PUBLIC_DIR = path.join(ROOT, 'public')
const STATIC_IMAGE_ROOT = '/static/images'

function getDocumentAssetDir(documentPath) {
  const normalizedPath = documentPath.replaceAll('\\', '/').replace(/\.mdx$/, '').replace(/^\.?\//, '')
  const segments = normalizedPath.split('/').filter(Boolean)

  if (segments[0] === 'blog' && segments.length >= 2) {
    return ['posts', ...segments.slice(1)].join('/')
  }

  if (segments[0] === 'project' && segments.length >= 2) {
    return ['projects', ...segments.slice(1)].join('/')
  }

  return null
}

function toAbsolutePublicPath(publicPath) {
  return path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''))
}

async function walkMdxFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walkMdxFiles(fullPath)))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

function getRelativeAssetPath(publicPath, assetDir) {
  const currentAssetPrefix = `${STATIC_IMAGE_ROOT}/${assetDir}/`

  if (publicPath.startsWith(currentAssetPrefix)) {
    return publicPath.slice(currentAssetPrefix.length)
  }

  return path.posix.basename(publicPath)
}

function planImageMove(publicPath, assetDir, operations) {
  const relativeAssetPath = getRelativeAssetPath(publicPath, assetDir)
  const nextPublicPath = `${STATIC_IMAGE_ROOT}/${assetDir}/${relativeAssetPath}`

  if (publicPath !== nextPublicPath) {
    operations.set(`${publicPath}->${nextPublicPath}`, {
      sourcePublicPath: publicPath,
      targetPublicPath: nextPublicPath,
    })
  }

  return relativeAssetPath
}

function rewriteDocument(content, assetDir, operations) {
  const imagePathPattern = /^\/static\/images\/(?:posts|projects)\/.+$/

  const nextContent = content
    .replace(/(src\s*=\s*)(["'])([^"']+)\2/g, (match, prefix, quote, src) => {
      if (!imagePathPattern.test(src)) {
        return match
      }

      const relativeAssetPath = planImageMove(src, assetDir, operations)
      return `${prefix}${quote}${relativeAssetPath}${quote}`
    })
    .replace(/^(\s*-\s+)(\/static\/images\/(?:posts|projects)\/\S+)(\s*)$/gm, (match, prefix, src, suffix) => {
      const relativeAssetPath = planImageMove(src, assetDir, operations)
      return `${prefix}${relativeAssetPath}${suffix}`
    })
    .replace(/<img(?=[\s/>])/g, '<Image')

  return nextContent
}

async function ensureTargetDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function main() {
  const mdxFiles = await walkMdxFiles(ARTICLES_DIR)
  const operations = new Map()
  const rewrites = []

  for (const filePath of mdxFiles) {
    const relativePath = path.relative(ARTICLES_DIR, filePath)
    const assetDir = getDocumentAssetDir(relativePath)

    if (!assetDir) {
      continue
    }

    const originalContent = await fs.readFile(filePath, 'utf8')
    const nextContent = rewriteDocument(originalContent, assetDir, operations)

    if (nextContent !== originalContent) {
      rewrites.push({ filePath, nextContent })
    }
  }

  for (const { sourcePublicPath, targetPublicPath } of operations.values()) {
    const sourceFilePath = toAbsolutePublicPath(sourcePublicPath)
    const targetFilePath = toAbsolutePublicPath(targetPublicPath)

    if (!(await fileExists(sourceFilePath))) {
      throw new Error(`이미지 파일을 찾을 수 없습니다: ${sourcePublicPath}`)
    }

    if (sourceFilePath === targetFilePath) {
      continue
    }

    if (await fileExists(targetFilePath)) {
      throw new Error(`대상 이미지가 이미 존재합니다: ${targetPublicPath}`)
    }

    await ensureTargetDirectory(targetFilePath)
    await fs.copyFile(sourceFilePath, targetFilePath)
  }

  for (const { filePath, nextContent } of rewrites) {
    await fs.writeFile(filePath, nextContent, 'utf8')
  }

  const removedSources = []

  for (const { sourcePublicPath, targetPublicPath } of operations.values()) {
    if (sourcePublicPath === targetPublicPath) {
      continue
    }

    const sourceFilePath = toAbsolutePublicPath(sourcePublicPath)
    await fs.unlink(sourceFilePath)
    removedSources.push(sourcePublicPath)
  }

  console.log(`Updated documents: ${rewrites.length}`)
  console.log(`Copied images: ${[...operations.values()].filter((item) => item.sourcePublicPath !== item.targetPublicPath).length}`)
  console.log(`Removed legacy images: ${removedSources.length}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
