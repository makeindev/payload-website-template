import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Logo Image',
      name: 'logo',
      relationTo: 'media',
      required: false,
      type: 'upload',
    },
    {
      admin: {
        components: {
          RowLabel: '@/global/Header/RowLabel#RowLabel',
        },
        initCollapsed: true,
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      name: 'navItems',
      type: 'array',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
