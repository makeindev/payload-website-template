import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
  fields: [
    {
      name: 'form',
      relationTo: 'forms',
      required: true,
      type: 'relationship',
    },
    {
      label: 'Enable Intro Content',
      name: 'enableIntro',
      type: 'checkbox',
    },
    {
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: 'Intro Content',
      name: 'introContent',
      type: 'richText',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  interfaceName: 'FormBlock',
}
