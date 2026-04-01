import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import 'pretendard/dist/web/variable/pretendardvariable.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import { Analytics, AnalyticsConfig } from 'pliny/analytics/index.js'
import { SearchProvider, SearchConfig } from 'pliny/search/index.js'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/articles/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',

  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,

    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className="overflow-x-clip scroll-smooth"
      suppressHydrationWarning
    >
      <meta name="msapplication-TileColor" content="#183fcb" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f2f4f8" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#060f1d" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="overflow-x-clip bg-[color:var(--page-background)] font-sans text-[color:var(--page-foreground)] antialiased">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <div className="relative min-h-screen">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(47,99,255,0.03),rgba(47,99,255,0))] dark:bg-[linear-gradient(180deg,rgba(91,142,255,0.06),rgba(91,142,255,0))]" />
              <SectionContainer>
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="mb-auto pb-20 pt-6">{children}</main>
                  <Footer />
                </div>
              </SectionContainer>
            </div>
          </SearchProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
