import type { CollectionConfig } from 'payload'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

import { groups } from '@/collections/groups'

import { authenticated } from '../../../access/authenticated'
import { UserAccounts } from './Accounts'

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
    group: groups.users,
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
      options: [{ label: 'User', value: 'user' }],
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
    {
      admin: { readOnly: true },
      fields: [
        { name: 'date', required: true, type: 'date' },
        { name: 'ip', type: 'text' },
        { name: 'userAgent', type: 'text' },
      ],
      label: 'Login History',
      name: 'loginHistory',
      type: 'array',
    },
  ],
  hooks: {
    afterDelete: [deleteLinkedAccounts(UserAccounts.slug)],
  },
  timestamps: true,
}
