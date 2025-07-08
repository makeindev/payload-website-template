import type { Media } from '@/payload-types'

export const image1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Curving abstract shapes with an orange and blue gradient',
  caption: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Photo by ',
              type: 'text',
              version: 1,
            },
            {
              fields: {
                linkType: 'custom',
                newTab: true,
                url: 'https://unsplash.com/@kirp',
              },
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Andrew Kliatskyi',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'link',
              version: 2,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' on Unsplash.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
}
