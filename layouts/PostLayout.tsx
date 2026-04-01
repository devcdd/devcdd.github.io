import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import MobileContentInset from '@/components/MobileContentInset'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/articles/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/articles/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, summary, tags } = content
  const basePath = path.split('/')[0]

  return (
    <MobileContentInset>
      <ScrollTopAndComment />
      <article className="space-y-10">
        <header className="border-b border-[color:var(--border)] pb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--copy-muted)]">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--copy-muted)] sm:text-lg">
              {summary}
            </p>
          )}
          {tags && (
            <div className="mt-6 flex flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="order-1 min-w-0 pb-8 lg:border-r lg:border-[color:var(--border)] lg:pr-10">
            <div className="prose max-w-none dark:prose-invert">{children}</div>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[color:var(--border)] pt-6 text-sm font-semibold">
              <Link
                href={editUrl(filePath)}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
              >
                GitHub에서 보기
              </Link>
              <Link
                href={`/${basePath}`}
                className="text-[color:var(--copy-muted)] hover:text-[color:var(--copy-strong)]"
              >
                블로그 목록으로 돌아가기
              </Link>
            </div>
          </div>

          <aside className="order-2 space-y-8 border-t border-[color:var(--border)] pt-8 lg:sticky lg:top-24 lg:h-fit lg:self-start lg:border-t-0 lg:pt-0">
            <div className="border-b border-[color:var(--border)] pb-6">
              <p className="eyebrow">Written By</p>
              <ul className="mt-5 space-y-5">
                {authorDetails.map((author) => (
                  <li key={author.name} className="flex items-center gap-4">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={56}
                        height={56}
                        alt="avatar"
                        className="h-14 w-14 object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-[color:var(--copy-strong)]">{author.name}</p>
                      {author.occupation && (
                        <p className="text-sm text-[color:var(--copy-muted)]">
                          {author.occupation}
                        </p>
                      )}
                      {author.github && (
                        <Link
                          href={author.github}
                          className="mt-1 inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {(prev || next) && (
              <div className="border-b border-[color:var(--border)] pb-6">
                <p className="eyebrow">More Reading</p>
                <div className="mt-5 space-y-4">
                  {prev?.path && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--copy-muted)]">
                        Previous
                      </p>
                      <Link
                        href={`/${prev.path}`}
                        className="mt-2 inline-flex font-semibold text-[color:var(--copy-strong)] hover:text-primary-700 dark:hover:text-primary-200"
                      >
                        {prev.title}
                      </Link>
                    </div>
                  )}
                  {next?.path && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--copy-muted)]">
                        Next
                      </p>
                      <Link
                        href={`/${next.path}`}
                        className="mt-2 inline-flex font-semibold text-[color:var(--copy-strong)] hover:text-primary-700 dark:hover:text-primary-200"
                      >
                        {next.title}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>

        {siteMetadata.comments && (
          <section className="border-t border-[color:var(--border)] pt-8 text-center" id="comment">
            <p className="eyebrow">Discussion</p>
            <div className="mt-5">
              <Comments slug={slug} />
            </div>
          </section>
        )}
      </article>
    </MobileContentInset>
  )
}
