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
      admin: {
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
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
