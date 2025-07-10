import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

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
    {
      defaultValue: 'admin',
      name: 'role',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
      ],
      required: true,
      type: 'select',
    },
  ],
  timestamps: true,
}
