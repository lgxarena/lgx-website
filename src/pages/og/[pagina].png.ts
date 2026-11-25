import type { APIRoute, GetStaticPaths } from 'astro'

import { imagemOg } from '@/lib/og'
import { PAGINAS_OG } from '@/lib/paginas'

export const getStaticPaths = (() =>
  Object.entries(PAGINAS_OG).map(([pagina, dados]) => ({
    params: { pagina },
    props: dados,
  }))) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const { titulo, texto } = props as (typeof PAGINAS_OG)[string]
  const png = await imagemOg(titulo, texto)
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
