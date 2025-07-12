'use client'

import { CheckCircle } from 'lucide-react'
import { FC } from 'react'

import type { FeatureBlock as FeatureBlockProps } from '@/payload-types'

export const FeatureBlock1: FC<FeatureBlockProps & { id?: string }> = ({ ...props }) => {
  const { title, description, features } = props

  return (
    <section className="w-full bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title ?? ''}
              </h2>
              <p className="text-lg text-muted-foreground">{description ?? ''}</p>
            </div>

            <div className="space-y-4">
              {features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-muted-foreground">{feature?.title || ''}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="h-full w-full space-y-4 rounded-xl bg-white p-6 shadow-2xl dark:bg-card">
                <div className="h-4 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-1/2 rounded bg-muted"></div>
                <div className="h-32 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-muted"></div>
                  <div className="h-3 w-2/3 rounded bg-muted"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 flex-1 rounded bg-primary/20"></div>
                  <div className="h-8 flex-1 rounded bg-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
