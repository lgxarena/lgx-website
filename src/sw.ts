/// <reference lib="webworker" />
/**
 * Service worker do site (issue #21), gerado pelo @vite-pwa/astro (estratégia injectManifest).
 *
 * - Guarda CSS, JS, fontes, ícones e a página offline já na instalação.
 * - Páginas: tenta a rede primeiro e guarda a última versão vista (abre sem internet).
 * - Imagens: guarda as já vistas.
 * - Sem rede e sem a página guardada: mostra /offline, com telefone, endereço e horários.
 */
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'paginas',
    networkTimeoutSeconds: 4,
    plugins: [new ExpirationPlugin({ maxEntries: 40 })],
  })
)

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'imagens',
    plugins: [new ExpirationPlugin({ maxEntries: 80, maxAgeSeconds: 30 * 24 * 60 * 60 })],
  })
)

setCatchHandler(async ({ request }) => {
  if (request.destination === 'document') {
    return (await matchPrecache('offline')) ?? Response.error()
  }
  return Response.error()
})
