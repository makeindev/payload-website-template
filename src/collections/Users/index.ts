import type { CollectionConfig } from 'payload'
import { withUsersCollection } from 'payload-auth-plugin/collection'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

import { Accounts } from '@/collections/Accounts'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  auth: true,
  slug: 'users',
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
      defaultValue: 'user',
      name: 'role',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      type: 'select',
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
    afterDelete: [deleteLinkedAccounts(Accounts.slug)],
  },
  timestamps: true,
}
