'use client'

import './index.scss'

import type { PayloadAdminBarProps } from '@payloadcms/admin-bar'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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

const Title: React.FC = () => <span className="text-foreground">Member</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  // Fetch user from API on mount and show only if role is 'admin'
  React.useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => {
        console.log('API /api/users/me response:', data)
        setShow(data.user?.role === 'admin')
      })
      .catch((err) => {
        console.error('API error:', err)
        setShow(false)
      })
  }, [])

  if (!show) return null

  return (
    <div
      className={cn(baseClass, 'py-2 bg-card text-foreground', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container text-foreground">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-foreground"
          classNames={{
            controls: 'font-medium text-foreground',
            logo: 'text-foreground',
            logout: 'text-foreground',
            user: 'text-foreground',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
