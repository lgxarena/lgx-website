import type { APIRoute } from 'astro'

import { PREVIEW_NOINDEX } from '@/lib/config'

/**
 * robots.txt gerado no build. Em preview (branch dev) bloqueia tudo; na virada (#25), basta
 * `PREVIEW_NOINDEX = false` para liberar os buscadores e apontar o sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const texto = PREVIEW_NOINDEX
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
