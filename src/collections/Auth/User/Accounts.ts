import { CollectionConfig } from 'payload'
import { withAccountCollection } from 'payload-auth-plugin/collection'

export const UserAccounts: CollectionConfig = withAccountCollection(
  {
    slug: 'userAccounts',
  },
  'users',
)
