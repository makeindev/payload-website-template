import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { sendEmail, welcomeEmailTemplate } from '@/lib/email'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) {
    return NextResponse.redirect(new URL('/login?error=invalid-verification-link', request.url))
  }

  try {
    const payload = await getPayload({ config: await configPromise })

    // Find user with matching email and token
    const users = await payload.find({
      collection: 'users',
      where: {
        and: [
          { email: { equals: email } },
          { emailVerificationToken: { equals: token } },
          { emailVerificationExpires: { greater_than: new Date().toISOString() } },
        ],
      },
    })

    if (users.docs.length === 0) {
      return NextResponse.redirect(new URL('/login?error=verification-link-expired', request.url))
    }

    const user = users.docs[0]

    // Update user to mark email as verified
    await payload.update({
      collection: 'users',
      data: {
        emailVerificationExpires: null,
        emailVerificationToken: null,
        emailVerified: true,
      },
      id: user.id,
    })

    // Send welcome email
    await sendEmail({
      html: welcomeEmailTemplate(email),
      subject: 'Welcome! Your email has been verified',
      to: email,
    })

    // Redirect to login with success message
    return NextResponse.redirect(new URL('/login?success=email-verified', request.url))
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.redirect(new URL('/login?error=verification-failed', request.url))
  }
}
