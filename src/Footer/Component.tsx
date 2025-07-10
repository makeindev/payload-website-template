import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { Container, Section } from '@/components/ds'
import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { FooterClient } from './Component.client'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="border-t bg-accent/30 mt-auto">
      <Section>
        <Container className="grid gap-2 grid-cols-1 md:grid-cols-[1fr_auto]">
          <div className="grid gap-2">
            <FooterClient footerData={footerData} />
            <p className="text-muted-foreground px-3">
              <Balancer>
                A Modern, Open-Source Website Starter — Built with Next.js & Payload CMS
              </Balancer>
            </p>
            <nav className="flex flex-col gap-2 px-3 text-sm text-muted-foreground underline underline-offset-4 md:flex-row md:gap-4">
              {navItems.length > 0 ? (
                navItems.map(({ link }, i) => (
                  <CMSLink className="hover:text-primary" key={i} {...link} />
                ))
              ) : (
                <>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/terms-of-service">Terms of Service</Link>
                  <Link href="/cookie-policy">Cookie Policy</Link>
                </>
              )}
            </nav>
            <p className="text-muted-foreground text-xs  px-3">
              ©{' '}
              <a href="https://github.com/makeindev" className="hover:underline">
                MakeinDev
              </a>
              . All rights reserved. 2025 - Present.
            </p>
          </div>
          <ThemeToggle />
        </Container>
      </Section>
    </footer>
  )
}
