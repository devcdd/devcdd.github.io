import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate.js'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import MobileContentInset from '@/components/MobileContentInset'
import Tag from '@/components/Tag'
import siteMetadata from '@/articles/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags } = content

  return (
    <MobileContentInset>
      <ScrollTopAndComment />
      <article className="space-y-10">
        <header className="border-b border-[color:var(--border)] pb-8 text-center">
          <time className="text-sm text-[color:var(--copy-muted)]" dateTime={date}>
            {formatDate(date, siteMetadata.locale)}
          </time>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl">
            {title}
          </h1>
          {tags && (
            <div className="mt-6 flex flex-wrap justify-center">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </header>

        <div className="pb-8">
          <div className="prose max-w-none dark:prose-invert">{children}</div>
        </div>

        {(prev || next) && (
          <footer className="border-t border-[color:var(--border)] pt-6">
            <div className="flex flex-col gap-4 text-sm font-semibold sm:flex-row sm:justify-between">
              {prev?.path ? (
                <Link
                  href={`/${prev.path}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  ← {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next?.path && (
                <Link
                  href={`/${next.path}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title} →
                </Link>
              )}
            </div>
          </footer>
        )}

        {siteMetadata.comments && (
          <section className="border-t border-[color:var(--border)] pt-8 text-center" id="comment">
            <Comments slug={slug} />
          </section>
        )}
      </article>
    </MobileContentInset>
  )
}
