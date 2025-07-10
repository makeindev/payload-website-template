'use client'

import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { SubmitButton } from '@/components/auth/submit-button'
import type { LoginResponse } from '@/lib/auth'
import { loginUser } from '@/lib/auth'

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res: LoginResponse = await loginUser({ email, password, rememberMe })

    setIsPending(false)

    if (res.error) {
      // Show error toast with specific error message
      switch (res.errorCode) {
        case 'INVALID_EMAIL':
          toast.error('Invalid Email', {
            description: res.error,
          })
          break
        case 'INVALID_CREDENTIALS':
          toast.error('Invalid Credentials', {
            description: 'The email or password you entered is incorrect',
          })
          break
        case 'AUTH_ERROR':
          toast.error('Authentication Failed', {
            description: 'Please try again later',
          })
          break
        default:
          toast.error('Login Failed', {
            description: res.error || 'Something went wrong',
          })
      }
    } else {
      toast.success('Welcome back!', {
        description: 'Redirecting to member page...',
      })
      router.push('/member')
    }
  }

  return (
    <form className="grid gap-6 my-6" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        className="w-full focus:outline-none border-b pb-2 h-8"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full focus:outline-none border-b pb-2 h-8 pr-10"
          required
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <div className="text-xs text-muted-foreground">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer">
          Remember me for 30 days
        </label>
      </div>

      <SubmitButton loading={isPending} text="Login" />
    </form>
  )
}
