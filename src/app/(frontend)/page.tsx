import { notFound } from 'next/navigation'

import PageTemplate, { generateMetadata } from './[slug]/page'

export default async function HomePage() {
  // Fetch the homepage global
  const homepageRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/homepage`, {
    cache: 'no-store',
  })
  const homepageGlobal = await homepageRes.json()

  // If homepage is set, render that page
  if (homepageGlobal?.home) {
    // homepageGlobal.home can be an ID or a populated object
    const pageIdOrObj = homepageGlobal.home
    let slug = ''
    if (typeof pageIdOrObj === 'string') {
      // Fetch the page to get the slug
      const pageRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/${pageIdOrObj}`,
        { cache: 'no-store' },
      )
      if (!pageRes.ok) return notFound()
      const pageData = await pageRes.json()
      slug = pageData.slug
    } else if (typeof pageIdOrObj === 'object' && pageIdOrObj.slug) {
      slug = pageIdOrObj.slug
    }
    if (slug) {
      // Render the selected page as homepage
      // PageTemplate expects params: Promise<{ slug?: string }>
      return PageTemplate({ params: Promise.resolve({ slug }) })
    }
  }

  // If homepage is not set, use your current homepage logic (slug = 'homepage')
  return PageTemplate({ params: Promise.resolve({ slug: 'homepage' }) })
}

export { generateMetadata }
