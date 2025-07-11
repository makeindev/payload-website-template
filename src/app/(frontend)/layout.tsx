import './globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'
import { Toaster } from 'sonner'

import { AdminBar } from '@/components/AdminBar'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Footer } from '@/global/Footer/Component'
import { Header } from '@/global/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'

// Custom wrapper to handle draftMode and preview prop
const AdminBarWrapper = async () => {
  const { isEnabled } = await draftMode()
  return <AdminBar preview={isEnabled} />
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>
          <Providers>
            {/* Use the custom AdminBarWrapper for draftMode awareness */}
            {await AdminBarWrapper()}
            <Header />
            <div className="max-w-7xl mx-auto">{children}</div>
            <Footer />
          </Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
