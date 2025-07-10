'use client'
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

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex items-center justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex-1 flex items-center">
          <HeaderNav data={data} />
        </div>
        <div className="ml-4">
          <AuthNav user={user} />
        </div>
      </div>
    </header>
  )
}
