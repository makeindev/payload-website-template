import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'

import { CardPostData } from '@/components/Card'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Search } from '@/search/Component'

import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    select: {
      slug: true,
      categories: true,
      meta: true,
      title: true,
    },
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none text-center dark:prose-invert">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Make In Dev Website Template Search`,
  }
}
