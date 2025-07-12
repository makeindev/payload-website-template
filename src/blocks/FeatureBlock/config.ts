import type { Block } from 'payload'

import { lucideIcon } from '@/fields/lucideIcon'

export const Feature: Block = {
  slug: 'feature',
  fields: [
    {
      defaultValue: 'feature1',
      name: 'designStyle',
      label: 'Design Style',
      options: [
        { label: 'Feature 1', value: 'feature1' },
        { label: 'Feature 2', value: 'feature2' },
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      fields: [
        lucideIcon(),
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  interfaceName: 'FeatureBlock',
}
