import type { APIRoute } from 'astro'

import { PREVIEW_NOINDEX } from '@/lib/config'

/**
 * robots.txt gerado no build. Na `main` (site público) libera os buscadores e aponta o sitemap;
 * em qualquer outra branch bloqueia tudo. Ver `PREVIEW_NOINDEX` em src/lib/config.ts.
 */
export const GET: APIRoute = ({ site }) => {
  const texto = PREVIEW_NOINDEX
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
