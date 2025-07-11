import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import { Container } from '@/components/ds'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative w-full min-h-[60vh] flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-20 pt-12">
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
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
          <Media
            className="w-full h-full object-cover"
            imgClassName="w-full h-full object-cover"
            fill
            priority
            resource={media}
          />
        </div>
      )}
      {media && typeof media === 'object' && media.caption && (
        <div className="container z-10 relative mt-3">
          <RichText data={media.caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
