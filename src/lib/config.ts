/**
 * O site só entra nos buscadores quando o Cloudflare Pages publica a branch `main` (a virada,
 * issue #25). Na `dev`, nos previews e no computador, fica fora: `noindex`, robots.txt bloqueando
 * tudo e as avaliações de exemplo à vista.
 */
export const PREVIEW_NOINDEX = process.env.CF_PAGES_BRANCH !== 'main'

export const NOME_DO_SITE = 'LGX Arena'
