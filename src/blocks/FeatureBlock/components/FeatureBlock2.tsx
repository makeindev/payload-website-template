'use client'

import * as ic from 'lucide-react'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import type { FeatureBlock as FeatureBlockProps } from '@/payload-types'

export const FeatureBlock2: FC<FeatureBlockProps & { id?: string }> = ({ ...props }) => {
  const { title, description, features } = props

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features?.map((feature, index) => {
            let Icon:
              | ForwardRefExoticComponent<
                  Omit<ic.LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
                >
              | undefined = undefined

            if (feature.lucideIcon) {
              Icon = ic?.[feature?.lucideIcon]
            }

            return (
              <Card key={index} className="border-2 transition-colors hover:border-primary/20">
                <CardContent className="space-y-4 p-6">
                  <div className="w-fit rounded-full bg-primary/10 p-3">{Icon && <Icon />}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
