import { MetadataRoute } from 'next'

type Route = {
  path: string
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/sobre', priority: 0.6 },
    { path: '/jogos', priority: 0.7 },
    { path: '/corujao', priority: 0.8 },
    { path: '/eventos', priority: 0.8 },
    { path: '/contato', priority: 0.7 },
    { path: '/regras.pdf', priority: 0.6 },
  ] satisfies Route[]

  const staticPages = routes.map((route) => {
    const path = route.path === '/' ? '' : `${route.path}`

    return {
      url: `https://lgxarena.com.br${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    }
  })

  return staticPages
}
