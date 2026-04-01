import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  href: string
  externalHref?: string
  imgSrc?: string
  self?: boolean
}

const Card = ({ title, description, imgSrc, href, externalHref, self }: CardProps) => (
  <div className="w-full p-0">
    <article className="group relative flex h-full flex-col gap-5 border-b border-[color:var(--border)] pb-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-400 focus-within:ring-offset-4 focus-within:ring-offset-[color:var(--page-background)]">
      <Link href={href} aria-label={`Link to ${title}`} className="absolute inset-0 z-10 block" />
      {imgSrc &&
        (
          <div>
          <Image
            alt={title}
            src={imgSrc}
            className="h-52 w-full object-cover object-center"
            width={544}
            height={306}
          />
          </div>
        )}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{self ? 'Solo Build' : 'Team Project'}</p>
          {externalHref && (
            <span className="border border-[color:var(--border)] px-3 py-1 text-xs font-semibold text-[color:var(--copy-muted)]">
              Live
            </span>
          )}
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--copy-strong)] transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-200">
          {title}
        </h2>
        <p className="flex-1 text-sm leading-7 text-[color:var(--copy-muted)] sm:text-base">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-300">
            상세 보기
          </span>
          {externalHref && (
            <Link
              href={externalHref}
              className="relative z-20 inline-flex items-center text-sm font-semibold text-[color:var(--copy-muted)] hover:text-[color:var(--copy-strong)]"
              aria-label={`Open live site for ${title}`}
            >
              라이브 보기
            </Link>
          )}
        </div>
      </div>
    </article>
  </div>
)

export default Card
