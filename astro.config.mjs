// @ts-check
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'
import AstroPWA from '@vite-pwa/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

// Painel de edição (Keystatic, #26): por enquanto só no `pnpm dev`, em /keystatic. O site
// publicado continua 100% estático até o painel ganhar o modo GitHub.
const comPainel = process.argv.includes('dev')

// https://astro.build/config
export default defineConfig({
  site: 'https://lgxarena.com.br',
  // URLs sem barra no final (/precos), como no site anterior; o Workers serve precos.html em /precos
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // Política de segurança de conteúdo (CSP): o Astro gera os hashes dos scripts e estilos da
  // página; só o que está aqui pode carregar. Os outros cabeçalhos ficam em public/_headers.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://lh3.googleusercontent.com",
        "font-src 'self'",
        "connect-src 'self'",
        "manifest-src 'self'",
        "worker-src 'self'",
        // Mapa do Google em Como chegar, só depois que a pessoa aceita carregar.
        'frame-src https://www.google.com',
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      // Atributos style="" (ex.: nomes de transição dos jogos) seguem permitidos.
      styleDirective: {
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  integrations: [
    ...(comPainel ? [react(), keystatic()] : []),
    // Fora do sitemap: 404, página offline e o atalho /reservar (vai para o WhatsApp).
    sitemap({
      filter: (pagina) => !/\/(404|offline|reservar)$/.test(new URL(pagina).pathname),
    }),
    // App instalável e página offline (issue #21). O service worker fica em src/sw.ts.
    AstroPWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'LGX Arena',
        short_name: 'LGX Arena',
        description: 'Centro de games e e-sports em São Paulo desde 2006.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#0e0e0e',
        theme_color: '#0e0e0e',
        icons: [
          { src: '/icones/icone-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icones/icone-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icones/icone-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Reservar',
            url: '/reservar',
            icons: [{ src: '/icones/icone-192.png', sizes: '192x192' }],
          },
          {
            name: 'Preços',
            url: '/precos',
            icons: [{ src: '/icones/icone-192.png', sizes: '192x192' }],
          },
          {
            name: 'Corujão',
            url: '/corujao',
            icons: [{ src: '/icones/icone-192.png', sizes: '192x192' }],
          },
        ],
      },
      injectManifest: {
        globPatterns: ['**/*.{css,js,woff2,svg,ico}', 'offline.html', 'icones/*.png'],
        globIgnores: ['sw.js'],
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
