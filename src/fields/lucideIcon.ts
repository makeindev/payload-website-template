import { icons } from 'lucide-react'
import { Field, Option } from 'payload'

import deepMerge from '../utilities/deepMerge'

export function generateLucideIconOptions(): Option[] {
  const lucideIconOptions: Option[] = []
  Object.keys(icons).forEach((icon) => {
    lucideIconOptions.push({
      label: icon,
      value: icon,
    })
  })

  return lucideIconOptions
}

export function lucideIcon({ overrides = {} } = {}): Field {
  const lucideIcon: Field = {
    name: 'lucideIcon',
    type: 'select',
    options: generateLucideIconOptions(),
  }

  return deepMerge(lucideIcon, overrides)
}
