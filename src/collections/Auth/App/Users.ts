import type { CollectionConfig } from 'payload'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

import { authenticated } from '@/access/authenticated'

import { AppAccounts } from './Accounts'

export const AppUsers: CollectionConfig = {
  slug: 'appUsers',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      admin: {
        description: 'Has the user verified their email address',
      },
      defaultValue: false,
      name: 'emailVerified',
      type: 'checkbox',
    },
    {
      admin: {
        hidden: true,
      },
      name: 'emailVerificationToken',
      type: 'text',
    },
    {
      admin: {
        hidden: true,
      },
      name: 'emailVerificationExpires',
      type: 'date',
    },
    {
      admin: {
        hidden: true,
      },
      name: 'passwordResetToken',
      type: 'text',
    },
    {
      admin: {
        hidden: true,
      },
      name: 'passwordResetExpires',
      type: 'date',
    },
  ],
  hooks: {
    afterDelete: [deleteLinkedAccounts(AppAccounts.slug)],
  },
  timestamps: true,
}
