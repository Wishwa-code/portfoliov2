// import { baseURL } from '@/app/resources'

// export default function robots() {
//     return {
//         rules: [
//             {
//                 userAgent: '*',
//             },
//         ],
//         sitemap: `${baseURL}/sitemap.xml`,
//     }
// }

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://wishwa.dev/sitemap.xml',
  }
}