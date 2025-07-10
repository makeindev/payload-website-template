import { CollectionConfig } from 'payload'
import { withAccountCollection } from 'payload-auth-plugin/collection'

import { groups } from '@/collections/groups'

export const UserAccounts: CollectionConfig = withAccountCollection(
  {
    slug: 'userAccounts',
    admin: {
      group: groups.users,
    },
  },
  'users',
)
