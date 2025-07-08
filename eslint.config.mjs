import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-plugin-prettier'
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      prettier,
      'sort-keys-custom-order': sortKeysCustomOrder,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'warn',
      'sort-keys-custom-order/object-keys': [
        'warn',
        {
          orderedKeys: [
            'auth',
            'slug',
            'labels',
            'access',
            'defaultPopulate',
            'admin',
            'fields',
            'hooks',
            'versions',
            'timestamps',
          ],
        },
      ],
    },
  },
  {
    ignores: ['.next/', './src/migrations'],
  },
]

export default eslintConfig
