import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Content Management',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    ...slugField(),
  ],
}
