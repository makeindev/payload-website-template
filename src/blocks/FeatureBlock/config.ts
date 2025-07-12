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
        { label: 'Feature 3', value: 'feature3' },
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
        {
          name: 'badge',
          label: 'Badge',
          type: 'text',
          required: false,
        },
        {
          name: 'badgeVariant',
          label: 'Badge Variant',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Destructive', value: 'destructive' },
          ],
          required: false,
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
