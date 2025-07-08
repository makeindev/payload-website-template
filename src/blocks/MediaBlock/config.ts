import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  fields: [
    {
      name: 'media',
      relationTo: 'media',
      required: true,
      type: 'upload',
    },
  ],
  interfaceName: 'MediaBlock',
}
