import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Project } from 'contentlayer/generated'
import MobileContentInset from '@/components/MobileContentInset'
import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/articles/siteMetadata'
import { resolveDocumentImageList } from '@/content-images'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/articles/${path}`

interface LayoutProps {
  content: CoreContent<Project>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function ProjectLayout({ content, children, next, prev }: LayoutProps) {
  const { title, summary, images, tags, href, repo, filePath, assetDir } = content
  const heroImage = resolveDocumentImageList(images, assetDir)[0]
  const sourceHref = repo ?? editUrl(filePath)
  const sourceLabel = repo ? 'GitHub에서 보기' : '문서 원본 보기'

  return (
    <MobileContentInset>
      <article className="space-y-10">
        <header className="border-b border-[color:var(--border)] pb-8">
          <p className="eyebrow">Project</p>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--copy-muted)] sm:text-lg">
              {summary}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className="mt-6 flex flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="mr-2 mt-2 inline-flex border border-primary-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-700 dark:border-primary-800 dark:text-primary-200"
                >
                  {tag.split(' ').join('-')}
                </span>
              ))}
            </div>
          )}
          {(href || repo) && (
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
              {href && (
                <Link
                  href={href}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  라이브 보기
                </Link>
              )}
              {repo && (
                <Link
                  href={repo}
                  className="text-[color:var(--copy-muted)] hover:text-[color:var(--copy-strong)]"
                >
                  GitHub에서 보기
                </Link>
              )}
            </div>
          )}
        </header>

        {heroImage && (
          <div className="border-b border-[color:var(--border)] pb-8">
            <Image
              src={heroImage}
              alt={title}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none dark:prose-invert">{children}</div>

        <footer className="space-y-6 border-t border-[color:var(--border)] pt-6">
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            <Link
              href={sourceHref}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
            >
              {sourceLabel}
            </Link>
            <Link
              href="/projects"
              className="text-[color:var(--copy-muted)] hover:text-[color:var(--copy-strong)]"
            >
              프로젝트 목록으로 돌아가기
            </Link>
          </div>

          {(prev || next) && (
            <div className="grid gap-4 border-t border-[color:var(--border)] pt-6 sm:grid-cols-2">
              <div>
                {prev?.path && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--copy-muted)]">
                      Previous
                    </p>
                    <Link
                      href={`/${prev.path}`}
                      className="mt-2 inline-flex font-semibold text-[color:var(--copy-strong)] hover:text-primary-700 dark:hover:text-primary-200"
                    >
                      {prev.title}
                    </Link>
                  </>
                )}
              </div>
              <div className="sm:text-right">
                {next?.path && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--copy-muted)]">
                      Next
                    </p>
                    <Link
                      href={`/${next.path}`}
                      className="mt-2 inline-flex font-semibold text-[color:var(--copy-strong)] hover:text-primary-700 dark:hover:text-primary-200"
                    >
                      {next.title}
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </footer>
      </article>
    </MobileContentInset>
  )
}
