'use client'

import Link from 'next/link'
import React from 'react'

import { LogoutButton } from '@/components/auth/logout-button'
import { Button } from '@/components/ui/button'
import type { User } from '@/payload-types'

interface AuthNavProps {
  user: User | null
}

export const AuthNav: React.FC<AuthNavProps> = ({ user }) => (
  <div className="flex gap-2">
    {user ? (
      <>
        <LogoutButton className="hidden" />
        <Button asChild>
          <Link href="/member">Member Area</Link>
        </Button>
      </>
    ) : (
      <>
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Sign Up</Link>
        </Button>
      </>
    )}
  </div>
)
