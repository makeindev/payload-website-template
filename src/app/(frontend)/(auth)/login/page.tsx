import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AuthBox } from '@/components/auth/auth-box'
import { LoginForm } from '@/components/auth/login-form'
import { LoginPageToast } from '@/components/auth/login-page-toast'
import { Container, Section } from '@/components/ds'
import { getUser } from '@/lib/auth'
import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const user: User | null = await getUser()

  if (user) {
    redirect('/member')
  }

  const params = await searchParams

  return (
    <Section>
      <Container>
        <AuthBox>
          <h1>Login</h1>

          {(params.success || params.error) && (
            <LoginPageToast success={params.success} error={params.error} />
          )}

          <LoginForm />
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link className="text-foreground" href="/register">
              Sign Up Now
            </Link>
          </p>
        </AuthBox>
      </Container>
    </Section>
  )
}
