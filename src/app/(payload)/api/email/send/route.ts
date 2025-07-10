import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'

import payloadConfig from '@/payload.config'

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: payloadConfig })
  const { emailTo, subject, template } = await req.json()

  // Use Payload's generated type for the global
  const emailSettings = (await payload.findGlobal({ slug: 'emailSettings' })) as any

  const to = emailTo || emailSettings.emailTo || 'makeindev@gmail.com'
  const from = emailSettings.emailFrom
  const mailSubject = subject || emailSettings.subject || 'Subject Email'
  const html = template || emailSettings.template || '<p>This is a test email from Payload CMS.</p>'

  if (!to || !from) {
    return NextResponse.json(
      {
        message: 'Missing required email fields (to or from).',
        success: false,
      },
      { status: 400 },
    )
  }

  // Create Nodemailer transporter using settings from global config
  const transporter = nodemailer.createTransport({
    auth: {
      pass: emailSettings.smtpPass,
      user: emailSettings.smtpUser,
    },
    host: emailSettings.smtpHost,
    port: Number(emailSettings.smtpPort) || 587,
    secure: !!emailSettings.smtpSecure,
  })

  try {
    await transporter.sendMail({
      from,
      html,
      subject: mailSubject,
      to,
    })
    return NextResponse.json({ message: 'Email sent successfully.', success: true })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        message: 'Failed to send email.',
        success: false,
      },
      { status: 500 },
    )
  }
}
