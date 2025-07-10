import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { groups } from '@/collections/groups'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: groups.content,
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
