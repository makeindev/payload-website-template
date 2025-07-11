import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { revalidateHeader } from './hooks/revalidateHeader'

const subMenuGroup = {
  type: 'group' as const,
  name: 'item',
  fields: [
    link({ appearances: false }),
    {
      name: 'menuContent',
      label: 'Menu Content',
      type: 'richText',
      required: false,
      admin: {},
    } as const,
  ],
}

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
        link({ appearances: false }),
        {
          name: 'children',
          label: 'Sub Menu',
          type: 'array' as const,
          fields: [subMenuGroup],
        },
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
