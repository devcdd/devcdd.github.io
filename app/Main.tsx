import Link from '@/components/Link'
import MobileContentInset from '@/components/MobileContentInset'
import siteMetadata from '@/articles/siteMetadata'
import tagData from './tag-data.json'
import { formatDate } from 'pliny/utils/formatDate.js'

const MAX_RECENT = 4

export default function Home({ posts }) {
  const recentPosts = posts.slice(0, MAX_RECENT)

  return (
    <MobileContentInset>
      <div className="space-y-10 font-mono">
        <section className="grid gap-8 border-b border-[color:var(--border)] pb-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <div className="py-2 sm:py-4">
            <p className="eyebrow">{siteMetadata.title}</p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl lg:text-5xl">
              {siteMetadata.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--copy-muted)] sm:text-lg">
              {siteMetadata.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="border border-primary-600 bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 dark:border-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                글 보기
              </Link>
              <Link
                href="/projects"
                className="border border-[color:var(--border)] px-4 py-3 text-sm font-semibold text-[color:var(--copy-strong)] transition hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-200"
              >
                프로젝트
              </Link>
            </div>
          </div>
          <div className="border-t border-[color:var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-2">
            <p className="eyebrow">Snapshot</p>
            <dl className="mt-6 space-y-5">
              <div className="flex items-end justify-between gap-4 border-b border-primary-100 pb-4 dark:border-primary-900">
                <dt className="text-sm font-medium text-[color:var(--copy-muted)]">Posts</dt>
                <dd className="font-display text-3xl font-bold text-[color:var(--copy-strong)] sm:text-4xl">
                  {posts.length}
                </dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-b border-primary-100 pb-4 dark:border-primary-900">
                <dt className="text-sm font-medium text-[color:var(--copy-muted)]">Tags</dt>
                <dd className="font-display text-3xl font-bold text-[color:var(--copy-strong)] sm:text-4xl">
                  {Object.keys(tagData).length}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="border-b border-[color:var(--border)] pb-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Recent Notes</p>
              <h2 className="section-title mt-3">최신 글</h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
            >
              전체 글 보기
            </Link>
          </div>
          <div className="mt-8 divide-y divide-[color:var(--border)] border-t border-[color:var(--border)]">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-5 transition-colors hover:bg-[color:var(--surface-muted)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--page-background)]"
              >
                <article className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--copy-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-[color:var(--copy-strong)] transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-200 sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--copy-muted)] sm:text-base">
                      {post.summary}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileContentInset>
  )
}
