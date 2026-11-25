/**
 * Dados estruturados (JSON-LD, schema.org) que ajudam o Google a entender a LGX:
 * o negócio, a organização, campeonatos e a FAQ. Ver issue #19.
 *
 * Avaliações não entram como `AggregateRating`: o Google ignora avaliações de um negócio
 * exibidas no próprio site.
 */
import type { CollectionEntry } from 'astro:content'

import { NOME_DO_SITE } from './config'
import { getHorarios, getPlanos, getSite } from './conteudo'

const SITE = 'https://lgxarena.com.br'
const ID_NEGOCIO = `${SITE}/#negocio`
const ID_ORGANIZACAO = `${SITE}/#organizacao`

const DIA_SCHEMA: Record<string, string> = {
  domingo: 'Sunday',
  segunda: 'Monday',
  terca: 'Tuesday',
  quarta: 'Wednesday',
  quinta: 'Thursday',
  sexta: 'Friday',
  sabado: 'Saturday',
}

export async function organizacao() {
  const site = await getSite()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ID_ORGANIZACAO,
    name: NOME_DO_SITE,
    legalName: site.razaoSocial,
    url: SITE,
    logo: `${SITE}/logo.png`,
    foundingDate: String(site.fundacao),
    sameAs: Object.values(site.redes),
  }
}

/** O centro de games como negócio local, com endereço, horários e faixa de preço. */
export async function negocio() {
  const [site, horarios, planos] = await Promise.all([getSite(), getHorarios(), getPlanos()])
  const { endereco } = site

  const precos = planos.flatMap((plano) => Object.values(plano.data.precos))
  const faixaDePreco = `R$ ${Math.min(...precos)} – R$ ${Math.max(...precos)}`

  const funcionamento = horarios.flatMap((horario) => {
    // O Corujão não tem dias fixos ("vésperas de fim de semana"): entra como sexta e sábado.
    const dias = horario.data.dias.length > 0 ? horario.data.dias : ['sexta', 'sabado']
    const diasDaSemana = dias.map((dia) => DIA_SCHEMA[dia]).filter(Boolean)
    if (diasDaSemana.length === 0) return []
    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: diasDaSemana,
        opens: horario.data.abre,
        closes: horario.data.fecha,
      },
    ]
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    '@id': ID_NEGOCIO,
    name: NOME_DO_SITE,
    description: site.descricao,
    url: SITE,
    image: `${SITE}/og/inicio.png`,
    logo: `${SITE}/logo.png`,
    telephone: site.telefone,
    priceRange: faixaDePreco,
    currenciesAccepted: 'BRL',
    address: {
      '@type': 'PostalAddress',
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: 'BR',
    },
    ...(endereco.geo && {
      geo: { '@type': 'GeoCoordinates', ...endereco.geo },
    }),
    hasMap: endereco.mapa,
    openingHoursSpecification: funcionamento,
    parentOrganization: { '@id': ID_ORGANIZACAO },
    sameAs: Object.values(site.redes),
  }
}

/** Trilha "Início › Página" das páginas internas. */
export function trilha(titulo: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE },
      { '@type': 'ListItem', position: 2, name: titulo, item: url },
    ],
  }
}

/** Um campeonato da agenda. */
export function evento(campeonato: CollectionEntry<'campeonatos'>) {
  const { data } = campeonato
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${data.nome} · ${data.jogo}`,
    startDate: data.data.toISOString().slice(0, 10),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@id': ID_NEGOCIO,
      '@type': 'Place',
      name: NOME_DO_SITE,
      address: `${SITE}/contato`,
    },
    organizer: { '@id': ID_ORGANIZACAO },
    ...(data.formato && { description: data.formato }),
    ...(data.inscricao !== undefined && {
      offers: {
        '@type': 'Offer',
        price: data.inscricao,
        priceCurrency: 'BRL',
        url: data.linkInscricao ?? `${SITE}/campeonatos`,
      },
    }),
  }
}

/** Perguntas frequentes. A resposta vai em texto simples (sem a sintaxe de link do Markdown). */
export function paginaDePerguntas(perguntas: CollectionEntry<'faq'>[]) {
  const textoSimples = (markdown = '') =>
    markdown
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim()
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((pergunta) => ({
      '@type': 'Question',
      name: pergunta.data.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: textoSimples(pergunta.body) },
    })),
  }
}
