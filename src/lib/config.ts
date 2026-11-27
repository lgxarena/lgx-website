/**
 * O site só entra nos buscadores quando a branch `main` é publicada (a virada, issue #25).
 * Na `dev`, nos previews e no computador, fica fora: `noindex`, robots.txt bloqueando tudo e
 * as avaliações de exemplo à vista. A branch vem do Cloudflare Workers Builds.
 */
const branch = process.env.WORKERS_CI_BRANCH
export const PREVIEW_NOINDEX = branch !== 'main'

/**
 * Cloudflare Web Analytics (issue #24): conta visitas sem cookie, só no site publicado (`main`).
 * O código é público por natureza (vai no HTML); o painel fica em Analytics > Web analytics.
 */
export const CLOUDFLARE_WEB_ANALYTICS =
  branch === 'main' ? 'e8f66359a039476dbbaa28ed233419ec' : undefined

export const NOME_DO_SITE = 'LGX Arena'
