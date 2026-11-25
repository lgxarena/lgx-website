/**
 * Gera os ícones do site a partir do X do logo (issue #20). Rodar quando a marca mudar:
 *   node scripts/gerar-icones.mjs
 * Saída em public/: favicon.ico (16/32/48), apple-touch-icon.png e public/icones/*.png.
 */
import { writeFile } from 'node:fs/promises'

import sharp from 'sharp'

const FUNDO = '#0e0e0e'
const VERMELHO = '#fa3232'
const X =
  'M102.544 16L128 32H106.546L96.2479 19.2254L85.9499 32H64.4957L89.9574 16L64.4957 0H85.9499L96.2479 12.7717L106.546 0H128L102.544 16Z'

/** X centralizado num quadrado; `area` é a fração da largura ocupada pelo X. */
function svg(tamanho, { area, fundo = FUNDO, raio = 0 }) {
  const largura = tamanho * area
  const escala = largura / 64
  const x = (tamanho - largura) / 2
  const y = (tamanho - 32 * escala) / 2
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}">
  ${fundo ? `<rect width="100%" height="100%" rx="${raio}" fill="${fundo}"/>` : ''}
  <path transform="translate(${x} ${y}) scale(${escala}) translate(-64 0)" fill="${VERMELHO}" d="${X}"/>
</svg>`)
}

const png = (entrada) => sharp(entrada).png({ compressionLevel: 9 }).toBuffer()

/** ICO com as imagens em PNG (aceito por todos os navegadores atuais). */
function ico(imagens) {
  const cabecalho = Buffer.alloc(6 + 16 * imagens.length)
  cabecalho.writeUInt16LE(0, 0)
  cabecalho.writeUInt16LE(1, 2)
  cabecalho.writeUInt16LE(imagens.length, 4)
  let deslocamento = cabecalho.length
  imagens.forEach(({ tamanho, dados }, indice) => {
    const base = 6 + 16 * indice
    cabecalho.writeUInt8(tamanho % 256, base)
    cabecalho.writeUInt8(tamanho % 256, base + 1)
    cabecalho.writeUInt16LE(1, base + 4)
    cabecalho.writeUInt16LE(32, base + 6)
    cabecalho.writeUInt32LE(dados.length, base + 8)
    cabecalho.writeUInt32LE(deslocamento, base + 12)
    deslocamento += dados.length
  })
  return Buffer.concat([cabecalho, ...imagens.map((imagem) => imagem.dados)])
}

const pequenos = await Promise.all(
  [16, 32, 48].map(async (tamanho) => ({
    tamanho,
    dados: await png(svg(tamanho, { area: 0.86, raio: tamanho * 0.2 })),
  }))
)
await writeFile('public/favicon.ico', ico(pequenos))
await writeFile('public/apple-touch-icon.png', await png(svg(180, { area: 0.66 })))
await writeFile('public/icones/icone-192.png', await png(svg(192, { area: 0.7, raio: 40 })))
await writeFile('public/icones/icone-512.png', await png(svg(512, { area: 0.7, raio: 108 })))
// Maskable: fundo até a borda e o X dentro da área segura (círculo de 80%).
await writeFile('public/icones/icone-maskable-512.png', await png(svg(512, { area: 0.56 })))
console.log('ícones gerados')
