import type { MouseEventHandler } from 'react'
import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const Tag = ({ text, onClick }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      onClick={onClick}
      className="mr-2 mt-2 inline-flex border border-primary-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-700 transition hover:border-primary-400 hover:bg-primary-50/70 dark:border-primary-800 dark:text-primary-200 dark:hover:border-primary-600 dark:hover:bg-primary-950/40"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
