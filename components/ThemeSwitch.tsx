'use client'

import { Fragment, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Menu, Transition } from '@headlessui/react'

const Sun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)

const Moon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)

const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="17" x2="13" y2="17"></line>
    <line x1="10" y1="13" x2="10" y2="17"></line>
  </svg>
)

const ICONS = {
  light: <Sun />,
  dark: <Moon />,
  system: <Monitor />,
}

const OPTIONS: Array<{ label: 'light' | 'dark' | 'system'; title: string }> = [
  { label: 'light', title: 'Light' },
  { label: 'dark', title: 'Dark' },
  { label: 'system', title: 'System' },
]

const ThemeSwitch = () => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const { theme, setTheme, resolvedTheme } = useTheme()

  if (!mounted) {
    return <span className="block h-10 w-10 border border-[color:var(--border)] bg-transparent" />
  }

  const activeTheme = theme ?? 'system'

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex h-10 w-10 items-center justify-center border border-[color:var(--border)] bg-transparent text-[color:var(--copy-strong)] transition hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-200">
        {activeTheme === 'system' ? ICONS.system : resolvedTheme === 'dark' ? ICONS.dark : ICONS.light}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-2 opacity-0"
      >
        <Menu.Items
          portal
          anchor={{ to: 'bottom end', gap: '0.75rem', padding: '1rem' }}
          className="z-[80] min-w-[10rem] border border-[color:var(--border)] bg-[color:var(--page-background)] p-1.5 focus:outline-none"
        >
          {OPTIONS.map((option) => {
            const selected = activeTheme === option.label

            return (
              <Menu.Item key={option.label}>
                <button
                  className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium transition ${
                    selected
                      ? 'bg-primary-50/70 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200'
                      : 'text-[color:var(--copy)] hover:bg-[color:var(--surface-muted)]'
                  }`}
                  onClick={() => setTheme(option.label)}
                >
                  {ICONS[option.label]}
                  {option.title}
                </button>
              </Menu.Item>
            )
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ThemeSwitch
