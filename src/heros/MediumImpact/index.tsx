import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute left-0 top-0 z-20 w-full pt-12">
        <div className="container">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center">
          <Media
            className="h-full w-full object-cover"
            imgClassName="w-full h-full object-cover"
            fill
            priority
            resource={media}
          />
        </div>
      )}
      {media && typeof media === 'object' && media.caption && (
        <div className="container relative z-10 mt-3">
          <RichText data={media.caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
