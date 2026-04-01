import Link from '@/components/Link'
import MobileContentInset from '@/components/MobileContentInset'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <MobileContentInset>
      <div className="space-y-8">
        <section className="border-b border-[color:var(--border)] pb-8">
          <p className="eyebrow">Explore by Topic</p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl">
            Tags
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--copy-muted)] sm:text-lg">
            자주 다루는 기술과 주제를 태그 단위로 묶었습니다. 특정 분야의 글만 빠르게 보고 싶을 때
            사용하면 됩니다.
          </p>
        </section>

        <section className="border-t border-[color:var(--border)] pt-6">
          <div className="flex flex-wrap gap-3">
            {sortedTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slug(tag)}`}
                className="group flex items-center gap-2 border border-[color:var(--border)] px-3 py-2 transition-colors hover:border-primary-300 dark:hover:border-primary-700"
                aria-label={`View posts tagged ${tag}`}
              >
                <span
                  className="inline-flex border border-primary-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-700 transition-colors group-hover:text-primary-700 dark:border-primary-800 dark:text-primary-200 dark:group-hover:text-primary-200"
                >
                  {tag.split(' ').join('-')}
                </span>
                <span className="text-sm font-semibold text-[color:var(--copy-muted)] transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-200">
                  {tagCounts[tag]}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileContentInset>
  )
}
