import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/auth/logout-button'
import { Container, Prose, Section } from '@/components/ds'
import { AccountStats } from '@/components/member/account-stats'
import { EmailVerificationStatus } from '@/components/member/email-verification-status'
import { SecurityOverview } from '@/components/member/security-overview'
import { UserProfileCard } from '@/components/member/user-profile-card'
import { getUser } from '@/lib/auth'
import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function Member() {
  const user: User | null = await getUser()

  if (!user) {
    redirect('/login')
  }

  const createdAt = user.createdAt ? new Date(user.createdAt) : new Date()
  const now = new Date()
  const accountAgeDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Prose>
              <h1>Member Area</h1>
              <p>Welcome back, {user.email.split('@')[0]}!</p>
            </Prose>
          </div>
          <LogoutButton />
        </div>

        {/* Account Stats Overview */}
        <div className="mb-8">
          <AccountStats user={user} accountAgeDays={accountAgeDays} />
        </div>

        {/* Main Member Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile and Email Verification */}
          <div className="space-y-6 lg:col-span-2">
            <UserProfileCard user={user} accountAgeDays={accountAgeDays} />

            {/* Email Verification - Only show if not verified */}
            {!user.emailVerified && <EmailVerificationStatus user={user} />}
          </div>

          {/* Right Column - Security Overview */}
          <div className="lg:col-span-1">
            <SecurityOverview user={user} />
          </div>
        </div>

        {/* Email Verification for verified users - smaller card */}
        {user.emailVerified && (
          <div className="mt-6">
            <div className="max-w-md">
              <EmailVerificationStatus user={user} />
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}
