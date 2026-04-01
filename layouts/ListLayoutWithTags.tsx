'use client'

import { KeyboardEvent, MouseEvent, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate.js'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import MobileContentInset from '@/components/MobileContentInset'
import Tag from '@/components/Tag'
import siteMetadata from '@/articles/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.replace(/\/$/, '').split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-8 flex items-center justify-between gap-4 border-t border-[color:var(--border)] pt-4 text-sm font-semibold text-[color:var(--copy)]">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
        >
          이전 페이지
        </Link>
      ) : (
        <span className="text-[color:var(--copy-muted)]">이전 페이지</span>
      )}
      <span>
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
        >
          다음 페이지
        </Link>
      ) : (
        <span className="text-[color:var(--copy-muted)]">다음 페이지</span>
      )}
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const normalizedPathname = pathname.replace(/\/$/, '')
  const isBlogCollection = normalizedPathname.startsWith('/blog')
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const [tagsExpanded, setTagsExpanded] = useState(() => !isBlogCollection)
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const handlePostClick = (event: MouseEvent<HTMLElement>, href: string) => {
    const target = event.target as HTMLElement

    if (target.closest('a, button')) {
      return
    }

    if (event.metaKey || event.ctrlKey) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    router.push(href)
  }

  const handlePostKeyDown = (event: KeyboardEvent<HTMLElement>, href: string) => {
    const target = event.target as HTMLElement

    if (target.closest('a, button')) {
      return
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    router.push(href)
  }

  const stopTagPropagation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <MobileContentInset>
      <div className="space-y-10">
        <section className="border-b border-[color:var(--border)] pb-8">
          <p className="eyebrow">
            {normalizedPathname.startsWith('/tags') ? 'Tagged Collection' : 'Blog Index'}
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--copy-muted)] sm:text-base">
                기술적인 문제 해결과 회고를 중심으로 정리한 글 목록입니다. 태그로 범위를 줄이거나
                검색 버튼으로 바로 찾아볼 수 있습니다.
              </p>
            </div>
            <div className="border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--copy)]">
              {posts.length} posts
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="h-fit border-b border-[color:var(--border)] pb-6 lg:sticky lg:top-24 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--copy-strong)]">
                Topics
              </h2>
              {!pathname.startsWith('/blog') && (
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  전체
                </Link>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-3">
              <Link
                href="/blog"
                className={`border px-4 py-2 text-sm font-semibold transition ${
                  normalizedPathname.startsWith('/blog')
                    ? 'border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500'
                    : 'border-[color:var(--border)] text-[color:var(--copy)] hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-200'
                }`}
              >
                All Posts
              </Link>
              {isBlogCollection && (
                <button
                  type="button"
                  aria-expanded={tagsExpanded}
                  aria-controls="blog-topics-list"
                  onClick={() => setTagsExpanded((expanded) => !expanded)}
                  className="flex items-center justify-between gap-3 border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--copy)] transition hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-200"
                >
                  <span>{tagsExpanded ? '태그 접기' : `태그 펼치기 (${sortedTags.length})`}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 transition-transform ${tagsExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="m5 8 5 5 5-5" />
                  </svg>
                </button>
              )}
              {(tagsExpanded || !isBlogCollection) && (
                <div id="blog-topics-list" className="contents">
                  {sortedTags.map((tag) => {
                    const active = normalizedPathname.split('/tags/')[1] === slug(tag)

                    return (
                      <Link
                        key={tag}
                        href={`/tags/${slug(tag)}`}
                        className={`border px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? 'border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500'
                            : 'border-[color:var(--border)] text-[color:var(--copy)] hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-200'
                        }`}
                        aria-label={`View posts tagged ${tag}`}
                      >
                        {tag} ({tagCounts[tag]})
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </aside>

          <section className="divide-y divide-[color:var(--border)] border-t border-[color:var(--border)]">
            {displayPosts.map((post) => {
              const href = `/${post.path}`

              return (
                <article
                  key={post.path}
                  className="group cursor-pointer py-6 transition-colors hover:bg-[color:var(--surface-muted)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--page-background)]"
                  role="link"
                  tabIndex={0}
                  onClick={(event) => handlePostClick(event, href)}
                  onKeyDown={(event) => handlePostKeyDown(event, href)}
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--copy-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-[color:var(--copy-strong)] transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-200 sm:text-[1.75rem]">
                    <Link href={href}>{post.title}</Link>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--copy-muted)] sm:text-base">
                    {post.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap">
                    {post.tags?.map((tag) => (
                      <Tag key={tag} text={tag} onClick={stopTagPropagation} />
                    ))}
                  </div>
                </article>
              )
            })}
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </section>
        </div>
      </div>
    </MobileContentInset>
  )
}
