import React from 'react'

import { getUser } from '@/lib/auth'
import type { Header, User } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { HeaderClient } from './Component.client'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const user: User | null = await getUser()
  return <HeaderClient data={headerData} user={user} />
}
