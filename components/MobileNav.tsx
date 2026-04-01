'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import headerNavLinks from '@/articles/headerNavLinks'
import siteMetadata from '@/articles/siteMetadata'
import Link from './Link'

const emptySubscribe = () => () => {}

const isLinkActive = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const pathname = usePathname()
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  useEffect(() => {
    document.body.style.overflow = navShow ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [navShow])

  useEffect(() => {
    if (!navShow) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNavShow(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navShow])

  const onToggleNav = () => setNavShow((status) => !status)
  const onCloseNav = () => setNavShow(false)

  const navOverlay = (
    <div
      className={`fixed inset-0 z-[70] overflow-hidden lg:hidden ${navShow ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!navShow}
    >
      <button
        aria-label="Close Menu Backdrop"
        className={`absolute inset-0 backdrop-blur-sm transition duration-300 ease-out ${
          navShow ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'rgb(var(--page-background-rgb) / 0.6)' }}
        onClick={onCloseNav}
      />
      <div
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col border-l border-[color:var(--border)] transition duration-300 ease-out ${
          navShow ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgb(var(--surface-rgb)) 0%, rgb(var(--page-background-rgb)) 100%)',
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[color:var(--border)] px-5 py-4">
          <div className="min-w-0">
            <p className="eyebrow">Navigation</p>
            <p className="mt-1.5 font-display text-lg font-semibold tracking-tight text-[color:var(--copy-strong)]">
              {siteMetadata.title}
            </p>
            <p className="mt-1.5 max-w-xs text-xs leading-5 text-[color:var(--copy-muted)]">
              {siteMetadata.headerTitle}
            </p>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center border border-[color:var(--border)] bg-[color:var(--surface-muted)] text-[color:var(--copy-strong)] transition-colors hover:bg-[color:var(--surface)]"
            aria-label="Close Menu"
            onClick={onCloseNav}
          >
            <span className="relative block h-4 w-4">
              <span className="absolute left-0 top-[7px] h-[1.5px] w-4 rotate-45 bg-current" />
              <span className="absolute left-0 top-[7px] h-[1.5px] w-4 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav className="flex-1 px-5 py-2" aria-label="Mobile">
          {headerNavLinks.map((link) => {
            const active = isLinkActive(pathname, link.href)

            return (
              <Link
                key={link.title}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`group flex items-center justify-between gap-3 border-b px-1 py-3 transition ${
                  active
                    ? 'border-primary-200 bg-primary-50/60 text-primary-700 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200'
                    : 'border-[color:var(--border)] text-[color:var(--copy)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--copy-strong)]'
                }`}
                onClick={onCloseNav}
              >
                <span className="min-w-0 text-[13px] font-semibold uppercase tracking-[0.16em]">
                  {link.title}
                </span>
                <span className="pr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 transition-transform ${
                      active
                        ? 'text-primary-600 dark:text-primary-300'
                        : 'text-[color:var(--copy-muted)] group-hover:translate-x-0.5 group-hover:text-[color:var(--copy-strong)]'
                    }`}
                  >
                    <path d="M4 10h12" />
                    <path d="m11 5 5 5-5 5" />
                  </svg>
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[color:var(--border)] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--copy-muted)]">
            Tap outside or press Esc
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        aria-controls="mobile-nav-overlay"
        aria-expanded={navShow}
        aria-label={navShow ? 'Close Menu' : 'Open Menu'}
        onClick={onToggleNav}
        className={`flex h-10 w-10 items-center justify-center border transition-colors lg:hidden ${
          navShow
            ? 'border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500'
            : 'border-[color:var(--border)] bg-transparent text-[color:var(--copy-strong)] hover:bg-[color:var(--surface-muted)]'
        }`}
      >
        <span className="relative block h-4 w-4">
          <span
            className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition duration-300 ${
              navShow ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-[1.5px] w-4 bg-current transition duration-300 ${
              navShow ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] h-[1.5px] w-4 bg-current transition duration-300 ${
              navShow ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>
      {isMounted ? createPortal(navOverlay, document.body) : null}
    </>
  )
}

export default MobileNav
