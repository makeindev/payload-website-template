import { FC, Fragment } from 'react'

import type { AboutBlock as AboutBlockProps } from '@/payload-types'

import About1 from './About1'
import About3 from './About3'

const designStyleComponents: Record<string, FC<AboutBlockProps & { id?: string }>> = {
  about1: About1,
  about3: About3,
}

export const AboutBlock: FC<AboutBlockProps & { id?: string }> = ({ ...props }) => {
  const { designStyle } = props

  const Component = designStyleComponents[designStyle]

  return <Fragment>{<Component {...props} />}</Fragment>
}
