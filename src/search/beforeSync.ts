import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, req, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, categories, id, meta, title } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    categories: [],
    meta: {
      ...meta,
      description: meta?.description,
      image: meta?.image?.id || meta?.image,
      title: meta?.title || title,
    },
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        depth: 0,
        disableErrors: true,
        id: category,
        req,
        select: { title: true },
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      categoryID: String(each.id),
      relationTo: 'categories',
      title: each.title,
    }))
  }

  return modifiedDoc
}
