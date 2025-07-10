import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AuthBox } from '@/components/auth/auth-box'
import { RegisterForm } from '@/components/auth/register-form'
import { Container, Section } from '@/components/ds'
import { getUser } from '@/lib/auth'
import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  const user: User | null = await getUser()

  if (user) {
    redirect('/member')
  }

  return (
    <Section>
      <Container>
        <AuthBox>
          <h1>Sign Up</h1>
          <RegisterForm />
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link className="text-foreground" href="/login">
              Login Now
            </Link>
          </p>
        </AuthBox>
      </Container>
    </Section>
  )
}
