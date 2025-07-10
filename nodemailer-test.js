import nodemailer from 'nodemailer'

// Provided SMTP and email details
const SMTP_HOST = 'smtp.gmail.com'
const SMTP_USER = 'makedigitalindonesia@gmail.com'
const SMTP_PASS = 'mwffjdzoigfhrbmr'
const EMAIL_TO = 'versaproject001@gmail.com'
const EMAIL_FROM = 'makeindev@gmail.com'
const EMAIL_SUBJECT = 'Test Email'

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

async function main() {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: EMAIL_SUBJECT,
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    })
    console.log('Message sent: %s', info.messageId)
    if (nodemailer.getTestMessageUrl) {
      const url = nodemailer.getTestMessageUrl(info)
      if (url) console.log('Preview URL: %s', url)
    }
    process.exit(0)
  } catch (err) {
    console.error('Error sending email:', err)
    process.exit(1)
  }
}

main()
