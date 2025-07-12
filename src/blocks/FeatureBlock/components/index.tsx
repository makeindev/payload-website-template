import { FC, Fragment } from 'react'

import type { FeatureBlock as FeatureBlockProps } from '@/payload-types'

import { FeatureBlock1 } from './FeatureBlock1'
import { FeatureBlock2 } from './FeatureBlock2'
import { FeatureBlock3 } from './FeatureBlock3'

const designStyleComponents: Record<string, FC<FeatureBlockProps & { id?: string }>> = {
  feature1: FeatureBlock1,
  feature2: FeatureBlock2,
  feature3: FeatureBlock3,
}

export const FeatureBlock: FC<FeatureBlockProps & { id?: string }> = ({ ...props }) => {
  const { designStyle } = props

  const Component = designStyleComponents[designStyle]

  return <Fragment>{<Component {...props} />}</Fragment>
}
