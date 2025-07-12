'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import type { Header, User } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import { AuthNav } from './Login'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  user: User | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, user }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container relative z-20 max-w-7xl"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-8 flex items-center justify-between">
        <Link href="/" className="mr-6">
          {data.logo && typeof data.logo === 'object' && data.logo.url && !logoError ? (
            <Image
              src={data.logo.url}
              alt={data.logo.alt || 'Logo'}
              className="block invert dark:invert-0"
              width={data.logo.width || 120}
              height={data.logo.height || 40}
              style={{ height: 'auto', maxHeight: '2.5rem', maxWidth: '100%', width: 'auto' }}
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>
        <div className="flex-1 flex items-center">
          <HeaderNav navItems={data.navItems || []} />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Link
            href="/search"
            className="flex items-center px-3 py-2 rounded hover:bg-accent focus:bg-accent text-foreground"
            aria-label="Search"
          >
            <span className="sr-only">Search</span>
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <AuthNav user={user} />
        </div>
      </div>
    </header>
  )
}
