/**
 * O site só entra nos buscadores quando a branch `main` é publicada (a virada, issue #25).
 * Na `dev`, nos previews e no computador, fica fora: `noindex`, robots.txt bloqueando tudo e
 * as avaliações de exemplo à vista. A branch vem do Cloudflare Workers Builds.
 */
const branch = process.env.WORKERS_CI_BRANCH ?? process.env.CF_PAGES_BRANCH
export const PREVIEW_NOINDEX = branch !== 'main'

export const NOME_DO_SITE = 'LGX Arena'
