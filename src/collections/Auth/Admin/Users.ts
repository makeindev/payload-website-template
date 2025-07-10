import type { CollectionConfig } from 'payload'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'

import { authenticated } from '@/access/authenticated'

import { AdminAccounts } from './Accounts'

export const AdminUsers: CollectionConfig = {
  auth: true,
  slug: 'adminUsers',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['firstName', 'email'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
  hooks: {
    afterDelete: [deleteLinkedAccounts(AdminAccounts.slug)],
  },
  timestamps: true,
}
