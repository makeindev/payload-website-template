'use client'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import React, { useState } from 'react'
import type { Footer as FooterType } from '@/payload-types'

export function FooterClient({ footerData }: { footerData: FooterType }) {
  const [logoError, setLogoError] = useState(false)

  return (
    <Link href="/" className="space-y-6 text-lg">
      <span className="flex items-center">
        {footerData.logo &&
        typeof footerData.logo === 'object' &&
        footerData.logo.url &&
        !logoError ? (
          <img
            src={footerData.logo.url}
            alt={footerData.logo.alt || 'Logo'}
            className="block invert dark:invert-0 h-10"
            onError={() => setLogoError(true)}
          />
        ) : (
          <Logo size="medium" loading="eager" priority="high" className="invert dark:invert-0" />
        )}
        <span className="font-bold">Website Template</span>
      </span>
    </Link>
  )
}
