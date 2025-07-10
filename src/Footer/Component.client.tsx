'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
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
          <Image
            src={footerData.logo.url}
            alt={footerData.logo.alt || 'Logo'}
            className="block invert dark:invert-0"
            width={footerData.logo.width || 120}
            height={footerData.logo.height || 40}
            style={{ height: 'auto', maxHeight: '2.5rem', maxWidth: '100%', width: 'auto' }}
            onError={() => setLogoError(true)}
            priority
          />
        ) : (
          <Logo size="medium" loading="eager" priority="high" className="invert dark:invert-0" />
        )}
        <span className="font-bold ml-4">Website Template</span>
      </span>
    </Link>
  )
}
