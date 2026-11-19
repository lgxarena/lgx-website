/**
 * Leitura do conteúdo do site, já ordenado. As páginas usam estas funções em vez de
 * chamar `getCollection` direto, para a ordem e os filtros ficarem num lugar só.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content'

export type Sala = CollectionEntry<'salas'>
export type Plano = CollectionEntry<'planos'>
export type SalaId = keyof Plano['data']['precos']

const porOrdem = <T extends { data: { ordem: number } }>(a: T, b: T) => a.data.ordem - b.data.ordem

export async function getSite() {
  const site = await getEntry('site', 'geral')
  if (!site) throw new Error('Falta o arquivo src/content/site/geral.yaml')
  return site.data
}

export async function getSalas() {
  return (await getCollection('salas')).sort(porOrdem)
}

export async function getPlanos(tipo?: Plano['data']['tipo']) {
  const planos = (await getCollection('planos')).sort(porOrdem)
  return tipo ? planos.filter((p) => p.data.tipo === tipo) : planos
}

/** Menor preço por hora entre as horas avulsas de uma sala (o "a partir de"). */
export async function getMenorPrecoPorHora(sala: SalaId) {
  const avulsos = await getPlanos('avulso')
  return Math.min(...avulsos.map((p) => p.data.precos[sala] / p.data.horas))
}

export async function getHorarios() {
  return (await getCollection('horarios')).sort(porOrdem)
}

export async function getJogos() {
  const jogos = await getCollection('jogos')
  return jogos.sort(
    (a, b) =>
      Number(b.data.popular) - Number(a.data.popular) ||
      a.data.nome.localeCompare(b.data.nome, 'pt-BR')
  )
}

/** Avaliações marcadas como destaque, mais recentes primeiro. */
export async function getAvaliacoesEmDestaque() {
  const avaliacoes = await getCollection('avaliacoes', (a) => a.data.destaque)
  return avaliacoes.sort((a, b) => b.data.data.getTime() - a.data.data.getTime())
}

/** Avisos cuja data de início/fim inclui `agora` (calculado no build). */
export async function getAvisosAtivos(agora = new Date()) {
  return getCollection('avisos', (a) => a.data.inicio <= agora && agora <= a.data.fim)
}

/** Campeonatos: os próximos (do mais perto ao mais longe) e os já jogados que têm campeão. */
export async function getCampeonatos(agora = new Date()) {
  const todos = await getCollection('campeonatos')
  const hoje = new Date(agora)
  hoje.setHours(0, 0, 0, 0)
  const proximos = todos
    .filter((c) => c.data.data >= hoje)
    .sort((a, b) => a.data.data.getTime() - b.data.data.getTime())
  const anteriores = todos
    .filter((c) => c.data.data < hoje && c.data.campeao)
    .sort((a, b) => b.data.data.getTime() - a.data.data.getTime())
  return { proximos, anteriores }
}

export const TEMAS_FAQ = {
  reservas: 'Reservas e pagamento',
  precos: 'Preços e tempo',
  idade: 'Idade e cadastro',
  convivencia: 'Comida e convivência',
  jogos: 'Jogos e equipamentos',
} as const

/** Perguntas frequentes agrupadas por tema, na ordem de `TEMAS_FAQ`. */
export async function getFaq() {
  const perguntas = (await getCollection('faq')).sort(porOrdem)
  return Object.entries(TEMAS_FAQ)
    .map(([id, titulo]) => ({
      id,
      titulo,
      perguntas: perguntas.filter((p) => p.data.tema === id),
    }))
    .filter((t) => t.perguntas.length > 0)
}

export async function getRegras() {
  return (await getCollection('regras')).sort(porOrdem)
}

export const CATEGORIAS_CARDAPIO = {
  bebidas: 'Bebidas',
  salgados: 'Salgados',
  lanches: 'Lanches',
  doces: 'Doces',
} as const

/** Itens disponíveis do cardápio, agrupados por categoria. */
export async function getCardapio() {
  const itens = (await getCollection('cardapio', (i) => i.data.disponivel)).sort(porOrdem)
  return Object.entries(CATEGORIAS_CARDAPIO).map(([id, titulo]) => ({
    id,
    titulo,
    itens: itens.filter((i) => i.data.categoria === id),
  }))
}
