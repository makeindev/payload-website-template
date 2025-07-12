import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  fields: [
    {
      defaultValue: 'lowImpact',
      label: 'Type',
      name: 'type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'With Image',
          value: 'withImage',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      name: 'richText',
      type: 'richText',
    },
    {
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
      name: 'descriptionRichText',
      type: 'richText',
      admin: {
        condition: (_, { type }) => type === 'withImage',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'badgeText',
      label: 'Badge Text',
      type: 'text',
      required: false,
      admin: {
        condition: (_, { type }) => type === 'withImage',
      },
    },
    {
      name: 'badgeIconColor',
      label: 'Badge Icon Color',
      type: 'text',
      required: false,
      defaultValue: '#facc15',
      admin: {
        condition: (_, { type }) => type === 'withImage',
      },
    },
    {
      name: 'overlayColor',
      label: 'Overlay Color',
      type: 'text',
      required: false,
      defaultValue: 'rgba(0,0,0,0.5)',
      admin: {
        condition: (_, { type }) => type === 'withImage',
      },
    },
    {
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact','withImage'].includes(type),
      },
      name: 'media',
      relationTo: 'media',
      required: true,
      type: 'upload',
    },
  ],
  label: false,
  name: 'hero',
  type: 'group',
}
