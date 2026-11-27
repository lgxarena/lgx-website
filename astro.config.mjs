// @ts-check
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'
import AstroPWA from '@vite-pwa/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import { fileURLToPath } from 'node:url'

// Painel de edição (Keystatic, #26) em /keystatic. Todas as páginas do site continuam estáticas;
// só o painel e a API dele (/api/keystatic) rodam no Worker, com login pelo GitHub.
// No `pnpm dev` o adaptador fica de fora: assim o painel no modo local grava direto nos arquivos.
const emDesenvolvimento = process.argv.includes('dev')
// Nome público do GitHub App do painel (não é segredo); as chaves ficam nos segredos do Worker.
process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ??= 'lgxarena-keystatic'
// Com o adaptador, os arquivos públicos vão para dist/client; o service worker tem de ir junto.
const pastaPublica = fileURLToPath(new URL('./dist/client', import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: 'https://lgxarena.com.br',
  // URLs sem barra no final (/precos), como no site anterior; o Workers serve precos.html em /precos
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  adapter: emDesenvolvimento
    ? undefined
    : cloudflare({ imageService: 'compile', prerenderEnvironment: 'node' }),
  // O painel não usa sessões do Astro; sem isso o adaptador criaria um KV à toa.
  session: false,
  // Política de segurança de conteúdo (CSP): o Astro gera os hashes dos scripts e estilos da
  // página; só o que está aqui pode carregar. Os outros cabeçalhos ficam em public/_headers.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://lh3.googleusercontent.com",
        "font-src 'self'",
        // Cloudflare Web Analytics (só no site publicado): envia as visitas para cloudflareinsights.com.
        "connect-src 'self' https://cloudflareinsights.com",
        "manifest-src 'self'",
        "worker-src 'self'",
        // Mapa do Google em Como chegar, só depois que a pessoa aceita carregar.
        'frame-src https://www.google.com',
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", 'https://static.cloudflareinsights.com'] },
      // Atributos style="" (ex.: nomes de transição dos jogos) seguem permitidos.
      styleDirective: {
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  integrations: [
    react(),
    keystatic(),
    // Fora do sitemap: 404, página offline, o atalho /reservar (vai para o WhatsApp) e o painel.
    sitemap({
      filter: (pagina) => !/\/(404|offline|reservar|painel)$/.test(new URL(pagina).pathname),
    }),
    // App instalável e página offline (issue #21). O service worker fica em src/sw.ts.
    AstroPWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,
      outDir: pastaPublica,
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
        globDirectory: pastaPublica,
        globPatterns: ['**/*.{css,js,woff2,svg,ico}', 'offline.html', 'icones/*.png'],
        // O código do painel (React + Keystatic) fica fora do cache offline dos visitantes.
        globIgnores: [
          'sw.js',
          '_astro/keystatic-page.*.js',
          '_astro/client.*.js',
          '_astro/react-dom.*.js',
        ],
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
