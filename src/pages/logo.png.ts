import type { APIRoute } from 'astro'

import { logoQuadrado } from '@/lib/og'

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await logoQuadrado()), { headers: { 'Content-Type': 'image/png' } })
