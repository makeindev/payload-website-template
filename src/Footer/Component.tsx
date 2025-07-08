import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Section, Container } from '@/components/ds'
import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="border-t bg-accent/30 mt-auto">
      <Section>
        <Container className="grid gap-6 grid-cols-1 md:grid-cols-[1fr_auto] items-center py-8">
          <div className="grid gap-6">
            <Link href="/" className="flex items-center space-x-3 text-lg">
              <span className="font-bold">Payload SaaS Starter</span>
            </Link>
            <p className="text-muted-foreground">
              <Balancer>
                A Modern, Open-Source Website Starter — Built with Next.js & Payload CMS
              </Balancer>
            </p>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground underline underline-offset-4 md:flex-row md:gap-4">
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
            <p className="text-muted-foreground text-xs">
              ©{' '}
              <a href="https://github.com/makeindev" className="hover:underline">
                MakeinDev
              </a>
              . All rights reserved. 2025-present.
            </p>
          </div>
          <div className="flex justify-end w-full md:w-auto">
            <ThemeToggle />
          </div>
        </Container>
      </Section>
    </footer>
  )
}
