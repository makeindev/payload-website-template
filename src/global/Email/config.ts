import type { GlobalConfig } from 'payload'

export const EmailSettings: GlobalConfig = {
  slug: 'emailSettings',
  access: {
    read: () => true,
  },
  fields: [
    {
      defaultValue: 'nodemailer',
      label: 'Provider',
      name: 'provider',
      options: [
        { label: 'Nodemailer (SMTP)', value: 'nodemailer' },
        // Add more providers in the future
      ],
      required: true,
      type: 'select',
    },
    {
      admin: { condition: (_, { provider }) => provider === 'nodemailer' },
      label: 'SMTP Host',
      name: 'smtpHost',
      type: 'text',
    },
    {
      admin: { condition: (_, { provider }) => provider === 'nodemailer' },
      defaultValue: 587,
      label: 'SMTP Port',
      name: 'smtpPort',
      type: 'number',
    },
    {
      admin: { condition: (_, { provider }) => provider === 'nodemailer' },
      label: 'SMTP Username',
      name: 'smtpUser',
      type: 'text',
    },
    {
      admin: { condition: (_, { provider }) => provider === 'nodemailer' },
      label: 'SMTP Password',
      name: 'smtpPass',
      type: 'text',
    },
    {
      admin: { condition: (_, { provider }) => provider === 'nodemailer' },
      defaultValue: false,
      label: 'Use Secure Connection (SSL/TLS)',
      name: 'smtpSecure',
      type: 'checkbox',
    },
    {
      admin: {
        components: {
          Field: '@/global/Email/TestEmailButton#TestEmailButton',
        },
      },
      name: 'testEmailButton',
      type: 'ui',
    },
  ],
}
