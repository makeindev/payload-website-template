/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import './index.scss'

import { useSelectedLayoutSegments } from 'next/navigation'
// import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { getUser } from '@/lib/auth'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span className="text-foreground font-bold">Admin Bar</span>

export const AdminBar: React.FC<{ preview?: boolean }> = ({ preview }) => {
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const [user, setUser] = useState<any>(null)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels

  React.useEffect(() => {
    ;(async () => {
      const user = await getUser()
      setUser(user)
      const isAdmin =
        !!user &&
        ((user.role &&
          user.role.toLowerCase() === 'admin' &&
          'collection' in user &&
          user.collection === 'adminUsers') ||
          (user.role && user.role.toLowerCase() === 'admin'))
      setShow(isAdmin)
    })()
  }, [])

  if (!show) return null

  return (
    <div className={cn(baseClass, 'py-2 bg-card text-foreground', { block: show, hidden: !show })}>
      <div className="container flex items-center justify-between gap-4 text-foreground">
        <div className="flex items-center gap-3">
          <Title />
          <span className="text-xs opacity-70">
            {collectionLabels[collection]?.plural || 'Pages'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded bg-muted text-foreground hover:bg-accent transition"
            onClick={() => {
              window.open(getClientSideURL() + '/admin', '_blank')
            }}
            title="Go to Admin"
          >
            Go to Admin
          </button>
          <button
            className="px-3 py-1 rounded bg-muted text-foreground hover:bg-accent transition"
            onClick={() => {
              window.open(getClientSideURL() + `/admin/collections/${collection}/create`, '_blank')
            }}
            title={`Add New ${collectionLabels[collection]?.singular || 'Page'}`}
          >
            Add New {collectionLabels[collection]?.singular || 'Page'}
          </button>
          {/* Exit Preview button if preview mode is enabled */}
          {preview && (
            <button
              className="px-3 py-1 rounded bg-warning text-foreground hover:bg-accent transition"
              onClick={async () => {
                await fetch('/next/exit-preview')
                window.location.reload()
              }}
              title="Exit Preview"
            >
              Exit Preview
            </button>
          )}
          {user && (
            <span className="ml-4 text-xs opacity-80">
              {user.email} ({user.role})
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
