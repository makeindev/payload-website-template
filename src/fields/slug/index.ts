import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { checkboxOverrides, slugOverrides } = overrides

  const checkBoxField: CheckboxField = {
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    defaultValue: true,
    name: 'slugLock',
    type: 'checkbox',
    ...checkboxOverrides,
  }

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slugField: TextField = {
    admin: {
      components: {
        Field: {
          clientProps: {
            checkboxFieldPath: checkBoxField.name,
            fieldToUse,
          },
          path: '@/fields/slug/SlugComponent#SlugComponent',
        },
      },
      ...(slugOverrides?.admin || {}),
      position: 'sidebar',
    },
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    index: true,
    label: 'Slug',
    ...(slugOverrides || {}),
    name: 'slug',
    type: 'text',
  }

  return [slugField, checkBoxField]
}
