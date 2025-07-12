import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import { FC } from 'react'

import { Container } from '@/components/ds'
import type { AboutBlock as AboutBlockProps, Media } from '@/payload-types'

import AccordionList, { AccordionItemProps } from './AccordionList'

const About3: FC<AboutBlockProps & { id?: string }> = ({ ...props }) => {
  const { blockName, header, image, content } = props

  const accordionContent: Array<AccordionItemProps> =
    content?.map((c) => ({
      title: (c?.title as string) || '',
      content: c?.body as DefaultTypedEditorState,
    })) || []

  return (
    <Container>
      <div className="sm:gap-y-13 flex w-full flex-wrap items-center gap-y-10 lg:-mx-1.5">
        <div className="relative w-full px-0 md:w-8/12 lg:order-2 lg:ml-auto lg:w-6/12 lg:px-1.5">
          {/* Circle Shape */}
          <div
            className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
            style={{ top: '-2rem', right: '-1.9rem' }}
          />

          {/* Soft Box Shape */}
          <div
            className="absolute hidden rounded bg-blue-100 md:block"
            style={{ width: '85%', height: '90%', left: '-1.5rem', bottom: '-1.8rem' }}
          />

          {/* Image */}
          <figure className="relative z-10 min-h-60 overflow-hidden rounded">
            <Image alt={(image as Media)?.alt || 'Image'} src={(image as Media)?.url || ''} fill />
          </figure>
        </div>

        <div className="w-full px-4 lg:w-5/12">
          <h2 className="mb-3 text-sm uppercase tracking-widest text-blue-500">{blockName}</h2>
          <h3 className="mb-7 text-4xl font-semibold">{header}</h3>

          {accordionContent.length && <AccordionList contents={accordionContent} />}
        </div>
      </div>
    </Container>
  )
}

export default About3
