import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  size?: 'small' | 'medium' | 'large'
  style?: React.CSSProperties
}

export const Logo = (props: Props) => {
  const {
    className,
    loading: loadingFromProps,
    priority: priorityFromProps,
    size = 'large',
    style,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  let width = 193
  let height = 34
  if (size === 'medium') {
    width = 120
    height = 22
  } else if (size === 'small') {
    width = 60
    height = 12
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={width}
      height={height}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('block', className)}
      style={{ height, width, ...style }}
      src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
    />
  )
}
