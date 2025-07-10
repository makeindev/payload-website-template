import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      admin: {
        description: 'Select the page to use as the site homepage.',
      },
      label: 'Homepage',
      name: 'home',
      relationTo: 'pages',
      required: true,
      type: 'relationship',
    },
  ],
}
