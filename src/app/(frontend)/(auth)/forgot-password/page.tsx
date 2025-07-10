import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AuthBox } from '@/components/auth/auth-box'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { Container, Section } from '@/components/ds'
import { getUser } from '@/lib/auth'
import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function ForgotPasswordPage() {
  const user: User | null = await getUser()

  if (user) {
    redirect('/member')
  }

  return (
    <Section>
      <Container>
        <AuthBox>
          <h1>Forgot Password</h1>
          <p className="text-muted-foreground mb-4">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          <ForgotPasswordForm />
          <p className="text-muted-foreground">
            Remember your password?{' '}
            <Link className="text-foreground" href="/login">
              Sign in
            </Link>
          </p>
        </AuthBox>
      </Container>
    </Section>
  )
}
