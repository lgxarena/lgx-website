// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://lgxarena.com.br',
  // URLs sem barra no final (/precos), como no site atual
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
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
