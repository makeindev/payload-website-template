import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { FC } from 'react'

import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export type AccordionItemProps = {
  title: string
  content: DefaultTypedEditorState
}

export type AccordionListProps = {
  contents: Array<AccordionItemProps>
}

const AccordionList: FC<AccordionListProps> = ({ ...props }) => {
  const { contents } = props

  return (
    <Accordion type="single" className="w-full" defaultValue="0">
      {contents.map(({ title, content }, index) => (
        <AccordionItem value={index.toString()} key={index} className="border-0">
          <AccordionTrigger className="flex-row-reverse justify-end gap-x-3 hover:text-blue-500 hover:no-underline [&[data-state=open]]:text-blue-500">
            {title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance pl-7">
            <RichText enableGutter={false} data={content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionList
