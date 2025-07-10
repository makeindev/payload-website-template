// resend-test.js
import { Resend } from 'resend'

const resend = new Resend('re_jcQqfYPf_FAxPYTToYQMbvWLS9uBaJxwS') // <-- Replace with your actual API key

async function main() {
  try {
    const result = await resend.emails.send({
      from: 'admin@makeindev.dpdns.org', // <-- Replace with your verified sender
      to: 'versaproject001@email.com', // <-- Replace with your recipient email
      subject: 'Test Email from Resend',
      html: '<h1>Hello from Resend!</h1><p>This is a test email.</p>',
    })
    console.log('Email sent result:', result)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

main()

// run test use this node resend-test.js
