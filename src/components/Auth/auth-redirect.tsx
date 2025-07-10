'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { User } from '@/payload-types'

interface AuthRedirectProps {
  user: User | null
  redirectTo?: string
  message?: string
}

export function AuthRedirect({
  message = 'You are already signed in. Redirecting to member page...',
  redirectTo = '/member',
  user,
}: AuthRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      toast.info('Already Signed In', {
        description: message,
      })
      router.push(redirectTo)
    }
  }, [user, redirectTo, message, router])

  return null
}
