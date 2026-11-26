import { defineMiddleware } from 'astro:middleware'

import { MODO_PAINEL_GITHUB } from '@/lib/painel'
import coresDoPainelComentadas from '@/styles/painel.css?raw'

/**
 * Painel de edição (/keystatic): única parte do site que roda no Worker. A interface do Keystatic
 * injeta estilos em tempo de execução, usa a fonte do Google e conversa direto com a API do
 * GitHub, então ele ganha uma CSP própria. As páginas do site seguem com a CSP estrita do
 * astro.config.mjs (e os cabeçalhos de public/_headers, que não valem para respostas do Worker).
 */
const CSP_DO_PAINEL = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://raw.githubusercontent.com",
  "connect-src 'self' https://api.github.com https://raw.githubusercontent.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

const CABECALHOS_DO_PAINEL = {
  'Content-Security-Policy': CSP_DO_PAINEL,
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Robots-Tag': 'noindex, nofollow',
}

const ehDoPainel = (caminho: string) =>
  caminho === '/keystatic' ||
  caminho.startsWith('/keystatic/') ||
  caminho.startsWith('/api/keystatic/')

/** Telas do painel (não a API) abertas sem login vão para a entrada da LGX em /painel. */
const precisaEntrar = (caminho: string, cookies: { has: (nome: string) => boolean }) =>
  MODO_PAINEL_GITHUB &&
  (caminho === '/keystatic' || caminho.startsWith('/keystatic/')) &&
  caminho !== '/keystatic/setup' &&
  !cookies.has('keystatic-gh-access-token') &&
  !cookies.has('keystatic-gh-refresh-token')

const coresDoPainel = coresDoPainelComentadas.replace(/\/\*[\s\S]*?\*\//g, '').trim()

/** Coloca as cores da LGX (src/styles/painel.css) no HTML das telas do painel. */
const comCoresDaLgx = async (resposta: Response) => {
  if (!resposta.headers.get('content-type')?.includes('text/html')) return resposta
  const html = await resposta.text()
  return new Response(
    html.replace(/<!doctype html>/i, `$&<style>${coresDoPainel}</style>`),
    resposta
  )
}

export const onRequest = defineMiddleware(async (contexto, proximo) => {
  if (contexto.isPrerendered || !ehDoPainel(contexto.url.pathname)) return proximo()

  const resposta = precisaEntrar(contexto.url.pathname, contexto.cookies)
    ? contexto.redirect('/painel', 302)
    : await comCoresDaLgx(await proximo())

  // Cópia da resposta: redirecionamentos (Response.redirect) têm cabeçalhos imutáveis.
  const respostaDoPainel = new Response(resposta.body, resposta)
  for (const [nome, valor] of Object.entries(CABECALHOS_DO_PAINEL)) {
    respostaDoPainel.headers.set(nome, valor)
  }
  return respostaDoPainel
})
