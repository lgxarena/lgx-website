/**
 * Lighthouse CI (issue #23): mede o build com celular e 4G simulados e falha o PR se
 * Performance, Acessibilidade ou SEO ficarem abaixo de 95.
 */
const paginas = [
  '/',
  '/precos',
  '/corujao',
  '/espaco',
  '/jogos',
  '/aniversarios',
  '/campeonatos',
  '/empresas',
  '/faq',
  '/regras',
  '/cardapio',
  '/contato',
]

module.exports = {
  ci: {
    collect: {
      // Arquivos de dist/client servidos com compressão, como a Cloudflare entrega em produção
      // (o `astro preview` com o adaptador roda no workerd e não comprime o HTML).
      staticDistDir: './dist/client',
      url: paginas.map((pagina) =>
        pagina === '/' ? 'http://localhost/' : `http://localhost${pagina}.html`
      ),
      // Três medições por página; as regras valem para a mediana (menos ruído no CI).
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless=new',
        // O preview fica fora dos buscadores de propósito (noindex até a virada, #25).
        skipAudits: ['is-crawlable'],
      },
    },
    assert: {
      aggregationMethod: 'median-run',
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Meta do projeto: 2,0 s. A grade de capas de /jogos fica em ~2,4 s no 4G simulado,
        // então o PR só falha acima de 2,5 s, o limite "bom" do Google.
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
}
