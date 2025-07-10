import { CollectionConfig } from 'payload'
import { withAccountCollection } from 'payload-auth-plugin/collection'

export const AppAccounts: CollectionConfig = withAccountCollection(
  {
    slug: 'appAccounts',
  },
  'appUsers',
)
