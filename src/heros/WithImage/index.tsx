"use client";

import React from "react";
import { Star } from "lucide-react";
import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import type { Page } from "@/payload-types";

export const WithImageHero: React.FC<Page['hero']> = ({ links, richText, media, badgeText, badgeIconColor, overlayColor }) => {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background Image (only from CMS/media prop) */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === "object" && (
          <Media fill imgClassName="w-full h-full object-cover -z-10" priority resource={media} />
        )}
        <div className="absolute inset-0" style={{ background: overlayColor || 'rgba(0,0,0,0.5)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center text-white">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="h-4 w-4" style={{ color: badgeIconColor || '#facc15' }} />
            <span className="text-sm">{badgeText || 'Trusted by 50,000+ companies'}</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            {richText && <RichText data={richText} enableGutter={false} />}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col sm:flex-row gap-4 justify-center">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} className="gap-2 px-8" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};