'use client'

import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { forgotPassword } from '@/lib/auth'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await forgotPassword(email)

      if (result.success) {
        setIsSuccess(true)
        toast.success('Email Sent!', {
          description:
            "If an account with that email exists, we've sent you a password reset link.",
        })
      } else {
        switch (result.errorCode) {
          case 'INVALID_EMAIL':
            toast.error('Invalid Email', {
              description: result.error || 'Please enter a valid email address',
            })
            break
          default:
            toast.error('Request Failed', {
              description: result.error || 'Something went wrong. Please try again.',
            })
        }
      }
    } catch (_error) {
      toast.error('Request Failed', {
        description: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="my-6 space-y-4 text-center">
        <p className="text-muted-foreground">Check your email for the password reset link.</p>
        <Link href="/login" className="text-foreground hover:underline">
          Return to login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="my-6 grid gap-6">
      <input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-8 w-full border-b pb-2 focus:outline-none"
        required
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  )
}
