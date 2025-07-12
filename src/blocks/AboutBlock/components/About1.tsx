import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import { FC } from 'react'

import { Container } from '@/components/ds'
import { AboutBlock as AboutBlockProps, Media } from '@/payload-types'

import AccordionList, { AccordionItemProps } from './AccordionList'

const About1: FC<AboutBlockProps & { id?: string }> = ({ ...props }) => {
  const { blockName, header, image, content } = props

  const accordionContent: Array<AccordionItemProps> =
    content?.map((c) => ({
      title: (c?.title as string) || '',
      content: c?.body as DefaultTypedEditorState,
    })) || []

  return (
    <Container>
      <div className="mb-28 flex flex-wrap items-center gap-y-10 lg:-mx-4 lg:mb-[5.5rem] xl:mb-24">
        <div className="w-full px-4 lg:w-7/12">
          <figure className="relative min-h-60 w-full rounded-md">
            <Image src={(image as Media)?.url || ''} alt={(image as Media)?.alt || 'Image'} fill />
          </figure>
        </div>

        <div className="w-full px-4 lg:w-5/12">
          <h2 className="mb-3 text-sm uppercase text-gray-500">{blockName}</h2>
          <h3 className="mb-7 text-4xl font-semibold">{header}</h3>

          {accordionContent.length && <AccordionList contents={accordionContent} />}
        </div>
      </div>
    </Container>
  )
}

export default About1
