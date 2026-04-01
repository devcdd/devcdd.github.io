import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  X,
  Mastodon,
  Threads,
  Instagram,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
}

const sizeMap = {
  5: 'h-5 w-5',
  6: 'h-6 w-6',
  8: 'h-8 w-8',
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      aria-label={kind}
      className="inline-flex h-10 w-10 items-center justify-center border border-[color:var(--border)] text-sm text-[color:var(--copy-muted)] transition hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-300"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg className={`fill-current ${sizeMap[size] ?? sizeMap[8]}`} />
    </a>
  )
}

export default SocialIcon
