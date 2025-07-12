import { FC, Fragment } from 'react'

import type { FeatureBlock as FeatureBlockProps } from '@/payload-types'

import { FeatureBlock1 } from './FeatureBlock1'
import { FeatureBlock2 } from './FeatureBlock2'

const designStyleComponents: Record<string, FC<FeatureBlockProps & { id?: string }>> = {
  feature1: FeatureBlock1,
  feature2: FeatureBlock2,
}

export const FeatureBlock: FC<FeatureBlockProps & { id?: string }> = ({ ...props }) => {
  const { designStyle } = props

  const Component = designStyleComponents[designStyle]

  return <Fragment>{<Component {...props} />}</Fragment>
}
