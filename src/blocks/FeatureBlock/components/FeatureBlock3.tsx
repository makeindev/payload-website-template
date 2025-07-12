"use client"

import { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import * as ic from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { FeatureBlock as FeatureBlockProps } from "@/payload-types"

export const FeatureBlock3: FC<FeatureBlockProps & { id?: string }> = ({ ...props }) => {
  const { title, description, features } = props

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title || "Powerful Features for Modern Development"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {description || "Everything you need to build, deploy, and scale your applications with confidence and ease."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => {
            let Icon: ForwardRefExoticComponent<Omit<ic.LucideProps, 'ref'> & RefAttributes<SVGSVGElement>> | undefined = undefined
            if (feature.lucideIcon) {
              Icon = ic?.[feature.lucideIcon]
            }
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                    {/* Optionally, you can add a badge if your feature object has one */}
                    {typeof (feature as any)?.badge === "string" && (feature as any).badge.length > 0 && (
                      <Badge variant={typeof (feature as any)?.badgeVariant === "string" ? (feature as any).badgeVariant : "default"}>
                        {(feature as any).badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-primary/10"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="gap-2">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  )
} 