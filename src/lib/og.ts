/**
 * Gera as imagens de compartilhamento (1200×630) e o logo quadrado com Satori (HTML → SVG,
 * com o texto virando curva) e Sharp (SVG → PNG). Roda só no build.
 */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import satori from 'satori'
import sharp from 'sharp'

const COR = { fundo: '#0e0e0e', texto: '#f2f2f2', apagado: '#b0b0b0', destaque: '#fa3232' }

const MARCA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 32"><g fill="${COR.texto}"><path d="M0 11.4344V20.5654H32.1031V18.5965H9.63093C9.37751 18.5965 9.17221 18.4671 9.17221 18.3075V11.4344H0Z"/><path d="M38.7654 17.434C39.5464 17.434 40.1795 16.7931 40.1795 16.0025C40.1795 15.2119 39.5464 14.5709 38.7654 14.5709C37.9845 14.5709 37.3514 15.2119 37.3514 16.0025C37.3514 16.7931 37.9845 17.434 38.7654 17.434Z"/><path d="M82.84 17.434C83.6209 17.434 84.254 16.7931 84.254 16.0025C84.254 15.2119 83.6209 14.5709 82.84 14.5709C82.059 14.5709 81.4259 15.2119 81.4259 16.0025C81.4259 16.7931 82.059 17.434 82.84 17.434Z"/><path d="M53.2276 17.9579V14.0394C53.2276 13.6816 53.6879 13.3915 54.2556 13.3915H76.05C76.1417 13.3915 76.216 13.3447 76.216 13.2869C76.216 12.2656 74.9023 11.4376 73.2818 11.4376H47.782C45.7557 11.4376 44.113 12.4729 44.113 13.7498V18.2531C44.113 19.5302 45.7557 20.5653 47.782 20.5653H72.8984C74.7307 20.5653 76.2161 19.6291 76.2161 18.4743V15.0049C76.2161 14.9471 76.1418 14.9003 76.0501 14.9003H58.8638C58.7721 14.9003 58.6977 14.9471 58.6977 15.0049V16.1427C58.6977 16.5005 59.158 16.7906 59.7257 16.7906H66.0643C66.6321 16.7906 67.0923 17.0807 67.0923 17.4385V17.9579C67.0923 18.3157 66.6321 18.6058 66.0643 18.6058H54.2557C53.688 18.6058 53.2276 18.3157 53.2276 17.9579Z"/></g><path fill="${COR.destaque}" d="M102.544 16L128 32H106.546L96.2479 19.2254L85.9499 32H64.4957L89.9574 16L64.4957 0H85.9499L96.2479 12.7717L106.546 0H128L102.544 16Z"/></svg>`

const X = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="64 0 64 32"><path fill="${COR.destaque}" d="M102.544 16L128 32H106.546L96.2479 19.2254L85.9499 32H64.4957L89.9574 16L64.4957 0H85.9499L96.2479 12.7717L106.546 0H128L102.544 16Z"/></svg>`

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

let fontes: Promise<{ name: string; data: Buffer; weight: 400 | 800 }[]> | undefined
function carregarFontes() {
  const pasta = join(process.cwd(), 'node_modules/@fontsource/inter/files')
  fontes ??= Promise.all(
    ([400, 800] as const).map(async (peso) => ({
      name: 'Inter',
      weight: peso,
      data: await readFile(join(pasta, `inter-latin-${peso}-normal.woff`)),
    }))
  )
  return fontes
}

type No = { type: string; props: Record<string, unknown> }
const el = (type: string, style: Record<string, unknown>, children?: unknown, extra = {}): No => ({
  type,
  props: { style, children, ...extra },
})

async function paraPng(arvore: No, largura: number, altura: number) {
  const svg = await satori(arvore as never, {
    width: largura,
    height: altura,
    fonts: await carregarFontes(),
  })
  return sharp(Buffer.from(svg)).png().toBuffer()
}

/** Imagem de compartilhamento de uma página. */
export function imagemOg(titulo: string, texto: string) {
  const arvore = el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      boxSizing: 'border-box',
      background: COR.fundo,
      fontFamily: 'Inter',
      position: 'relative',
    },
    [
      el(
        'img',
        { position: 'absolute', right: -300, top: 95, width: 880, height: 440, opacity: 0.12 },
        undefined,
        {
          src: dataUri(X),
        }
      ),
      el('img', { width: 256, height: 64 }, undefined, { src: dataUri(MARCA) }),
      el('div', { display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }, [
        el(
          'div',
          {
            fontSize: titulo.length > 28 ? 68 : 84,
            fontWeight: 800,
            color: COR.texto,
            lineHeight: 1.05,
            letterSpacing: -2,
          },
          titulo
        ),
        el('div', { fontSize: 34, color: COR.apagado, lineHeight: 1.35 }, texto),
      ]),
      el(
        'div',
        { display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: COR.apagado },
        [
          el('div', { width: 40, height: 6, background: COR.destaque, borderRadius: 3 }),
          el('div', {}, 'lgxarena.com.br'),
        ]
      ),
    ]
  )
  return paraPng(arvore, 1200, 630)
}

/** Logo quadrado (512×512) para o Google e para os dados estruturados. */
export function logoQuadrado() {
  const arvore = el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: COR.fundo,
    },
    el('img', { width: 400, height: 100 }, undefined, { src: dataUri(MARCA) })
  )
  return paraPng(arvore, 512, 512)
}
