import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'], // Disallow Sanity Studio if you have it
    },
    sitemap: 'https://www.loveandlearning.net/sitemap.xml',
  }
}