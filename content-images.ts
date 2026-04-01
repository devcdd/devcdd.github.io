export const STATIC_IMAGE_ROOT = '/static/images'

function normalizeDocumentPath(documentPath: string) {
  const normalized = documentPath.replaceAll('\\', '/')
  const articlesIndex = normalized.lastIndexOf('/articles/')
  const withoutArticlesPrefix =
    articlesIndex >= 0
      ? normalized.slice(articlesIndex + '/articles/'.length)
      : normalized.replace(/^articles\//, '')

  return withoutArticlesPrefix.replace(/\.mdx$/, '').replace(/^\.?\//, '')
}

export function getDocumentAssetDir(documentPath: string) {
  const normalizedPath = normalizeDocumentPath(documentPath)
  const segments = normalizedPath.split('/').filter(Boolean)

  if (segments[0] === 'blog' && segments.length >= 2) {
    return ['posts', ...segments.slice(1)].join('/')
  }

  if (segments[0] === 'project' && segments.length >= 2) {
    return ['projects', ...segments.slice(1)].join('/')
  }

  return null
}

export function requireDocumentAssetDir(documentPath: string) {
  const assetDir = getDocumentAssetDir(documentPath)

  if (!assetDir) {
    throw new Error(`지원하지 않는 문서 경로입니다: ${documentPath}`)
  }

  return assetDir
}

function isAbsoluteImagePath(src: string) {
  return (
    src.startsWith('/') ||
    src.startsWith('//') ||
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  )
}

export function resolveContentImagePath(src: string | null | undefined, assetDir?: string | null) {
  if (typeof src !== 'string') {
    return undefined
  }

  const trimmed = src.trim()

  if (!trimmed || isAbsoluteImagePath(trimmed) || !assetDir) {
    return trimmed
  }

  return `${STATIC_IMAGE_ROOT}/${assetDir}/${trimmed.replace(/^\.?\//, '')}`
}

export function resolveDocumentImageList(images: unknown, assetDir?: string | null) {
  if (!images) {
    return []
  }

  const imageList = Array.isArray(images) ? images : [images]

  return imageList.flatMap((image) => {
    if (typeof image !== 'string') {
      return []
    }

    const resolved = resolveContentImagePath(image, assetDir)
    return resolved ? [resolved] : []
  })
}
