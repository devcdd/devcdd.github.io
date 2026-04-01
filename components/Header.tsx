'use client'

import siteMetadata from '@/articles/siteMetadata'
import headerNavLinks from '@/articles/headerNavLinks'
import { usePathname } from 'next/navigation'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const isLinkActive = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

const Header = () => {
  const pathname = usePathname()

  return (
    <>
      <div aria-hidden className="mb-5 h-16 md:h-[72px]" />
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--border)] backdrop-blur-xl"
        style={{ backgroundColor: 'rgb(var(--page-background-rgb) / 0.84)' }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label={siteMetadata.title} className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-primary-600 bg-primary-600 font-display text-[11px] font-bold tracking-[0.16em] text-white dark:border-primary-500 dark:bg-primary-500">
                  CDD
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base font-semibold tracking-tight text-[color:var(--copy-strong)] sm:text-lg">
                    {siteMetadata.title}
                  </div>
                  <div className="hidden truncate text-xs text-[color:var(--copy-muted)] md:block">
                    {siteMetadata.headerTitle}
                  </div>
                </div>
              </div>
            </Link>
            <div className="hidden items-center gap-4 lg:flex">
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => {
                  const active = isLinkActive(pathname, link.href)

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                        active
                          ? 'text-primary-700 dark:text-primary-200'
                          : 'text-[color:var(--copy-muted)] hover:text-[color:var(--copy-strong)]'
                      }`}
                    >
                      {link.title}
                    </Link>
                  )
                })}
            </div>
            <div className="flex items-center gap-1.5">
              <SearchButton />
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
