import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import type { ReactNode } from 'react'
import { Provider } from '@/components/provider'
import { appName, siteUrl, basePath } from '@/lib/site'
import './global.css'

const font = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: 'Code snippets to use across JavaScript projects.',
  applicationName: appName,
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: `${basePath}/favicon.png`,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: appName,
    title: appName,
    description: 'Code snippets to use across JavaScript projects.',
  },
  twitter: {
    card: 'summary',
    title: appName,
    description: 'Code snippets to use across JavaScript projects.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
