'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { clearAuthCookies } from '@/lib/auth'

export function LogoutButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      const result = await clearAuthCookies()

      if (result.success) {
        toast.success('Logged out successfully', {
          description: 'You have been signed out of your account.',
        })
        router.push('/')
        router.refresh() // Refresh to clear any cached user state
      } else {
        toast.error('Logout failed', {
          description: 'Please try again.',
        })
      }
    } catch (_error) {
      toast.error('Logout failed', {
        description: 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoading} className={className}>
      {isLoading ? 'Signing out...' : 'Logout'}
    </Button>
  )
}
