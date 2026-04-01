import Link from './Link'
import siteMetadata from '@/articles/siteMetadata'
import SocialIcon from '@/components/social-icons'
import MobileContentInset from '@/components/MobileContentInset'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] py-8">
      <MobileContentInset>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">{siteMetadata.title}</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--copy-strong)]">
              {siteMetadata.headerTitle}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[color:var(--copy-muted)] sm:text-base">
              {siteMetadata.description}
            </p>
          </div>
          <div className="space-y-4 md:text-right">
            <div className="flex gap-3 md:justify-end">
              <SocialIcon kind="github" href={siteMetadata.github} size={5} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
              <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
            </div>
            <div className="text-sm text-[color:var(--copy-muted)]">
              <span>{siteMetadata.author}</span>
              <span>{` · © ${new Date().getFullYear()}`}</span>
              <span>{` · `}</span>
              <Link href="/">{siteMetadata.title}</Link>
            </div>
            <div className="text-sm font-medium text-primary-600 dark:text-primary-300">
              <Link href={siteMetadata.siteRepo}>GitHub Repository</Link>
            </div>
          </div>
        </div>
      </MobileContentInset>
    </footer>
  )
}
