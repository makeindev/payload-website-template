import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  fields: [
    {
      defaultValue: 'about1',
      name: 'designStyle',
      label: 'Design Style',
      options: [
        { label: 'About 1', value: 'about1' },
        { label: 'About 3', value: 'about3' },
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'header',
      label: 'Header',
      type: 'text',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Content Title',
          type: 'text',
        },
        {
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          label: 'Content Body',
          name: 'body',
          type: 'richText',
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
  interfaceName: 'AboutBlock',
}
