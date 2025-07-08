import React from 'react'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer as FooterType } from '@/payload-types'
// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ThemeToggle } from '@/components/theme/theme-toggle'
// import { Section, Container } from '@/components/ds' // Uncomment if available

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border dark:bg-card">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 md:gap-8">
          <Link className="flex items-center space-x-3" href="/">
            <Logo />
            <h3 className="text-lg font-bold">Payload SaaS Starter</h3>
          </Link>
          <p className="text-muted-foreground max-w-md">
            <Balancer>
              Open Source SaaS starter for creating applications with Next.js and Payload CMS.
            </Balancer>
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground underline underline-offset-4 md:flex-row md:gap-4">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
          <p className="text-muted-foreground text-xs">
            © <a href="https://github.com/makeindev">makeindev</a>. All rights reserved.
            2025-present.
          </p>
        </div>
        <div className="flex flex-col-reverse items-start md:flex-col gap-4 md:items-end">
          <ThemeToggle />
          <nav className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            {navItems.map(({ link }, i) => (
              <CMSLink className="text-white" key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
