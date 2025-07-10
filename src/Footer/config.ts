import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
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
    afterChange: [revalidateFooter],
  },
}
