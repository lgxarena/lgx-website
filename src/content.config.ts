/**
 * Conteúdo editável do site (issue #8).
 *
 * Cada coleção é uma pasta em `src/content/` com um arquivo por item — o mesmo formato que o
 * painel (Keystatic, issue #26) vai editar. Se um arquivo sair do formato, o build falha com a
 * mensagem do campo errado.
 */
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const hora = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use o formato HH:MM, por exemplo 22:00')

const dinheiro = z.number().positive('O valor precisa ser maior que zero')

const ordem = z.number().int().nonnegative().default(0)

const dados = (pasta: string) =>
  glob({ pattern: '**/*.{yaml,yml,json}', base: `./src/content/${pasta}` })
const textos = (pasta: string) => glob({ pattern: '**/*.md', base: `./src/content/${pasta}` })

/** Configurações gerais: contato, endereço e redes. Um único arquivo (`site/geral.yaml`). */
const site = defineCollection({
  loader: dados('site'),
  schema: z.object({
    nome: z.string(),
    descricao: z.string(),
    fundacao: z.number().int(),
    telefone: z.string().regex(/^\+\d{12,13}$/, 'Use o formato +5511XXXXXXXX'),
    whatsapp: z.string().regex(/^\d{12,13}$/, 'Só números, com DDI e DDD: 5511XXXXXXXX'),
    endereco: z.object({
      logradouro: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      uf: z.string().length(2),
      cep: z.string().optional(),
      mapa: z.url(),
    }),
    redes: z.object({
      instagram: z.url(),
      tiktok: z.url(),
      twitch: z.url(),
      youtube: z.url(),
      facebook: z.url(),
    }),
    rank: z.url(),
  }),
})

const itemSetup = z.object({ item: z.string(), modelo: z.string() })

/** Salas de jogo e o setup de cada uma. O nome do arquivo (`pro`, `vip`) é a chave usada nos preços. */
const salas = defineCollection({
  loader: dados('salas'),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      resumo: z.string(),
      foto: image().optional(),
      hardware: z.array(itemSetup).min(1),
      perifericos: z.array(itemSetup).min(1),
      ordem,
    }),
})

/** Horas avulsas e pacotes, com o preço por PC em cada sala. */
const planos = defineCollection({
  loader: dados('planos'),
  schema: z
    .object({
      nome: z.string(),
      tipo: z.enum(['avulso', 'pacote']),
      horas: z.number().int().positive(),
      janela: z.object({ inicio: hora, fim: hora }).optional(),
      dias: z.string().optional(),
      observacao: z.string().optional(),
      precos: z.object({ pro: dinheiro, vip: dinheiro }),
      destaque: z.boolean().default(false),
      ordem,
    })
    .refine((p) => p.tipo === 'avulso' || p.janela, {
      message: 'Pacotes precisam de uma janela de horário (início e fim)',
      path: ['janela'],
    }),
})

const diaSemana = z.enum([
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo',
  'feriado',
])

/** Horário de funcionamento. O Corujão entra com `destaque: true` e sem dias fixos. */
const horarios = defineCollection({
  loader: dados('horarios'),
  schema: z.object({
    rotulo: z.string(),
    dias: z.array(diaSemana).default([]),
    abre: hora,
    fecha: hora,
    observacao: z.string().optional(),
    destaque: z.boolean().default(false),
    ordem,
  }),
})

export const categoriasDeJogo = [
  'Ação',
  'Aventura',
  'Battle Royale',
  'Competitivo',
  'Construção',
  'Corrida',
  'Esportes',
  'Estratégia',
  'Fantasia',
  'FPS',
  'MMO',
  'MMORPG',
  'MOBA',
  'Mundo Aberto',
  'RPG',
  'RPG de Ação',
  'Sandbox',
  'Sci-Fi',
  'Simulação',
  'Sobrevivência',
  'Tiro',
] as const

/** Jogos instalados. A capa fica na mesma pasta do arquivo do jogo. */
const jogos = defineCollection({
  loader: dados('jogos'),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      capa: image(),
      categorias: z.array(z.enum(categoriasDeJogo)).min(1),
      popular: z.boolean().default(false),
    }),
})

/** Avaliações do Google escolhidas para o site (issue #29). */
const avaliacoes = defineCollection({
  loader: dados('avaliacoes'),
  schema: z.object({
    autor: z.string(),
    fotoAutor: z.url().optional(),
    nota: z.number().int().min(1).max(5),
    texto: z.string().min(1),
    data: z.coerce.date(),
    link: z.url().optional(),
    destaque: z.boolean().default(false),
  }),
})

/** Perguntas frequentes. A resposta é o corpo do arquivo Markdown. */
const faq = defineCollection({
  loader: textos('faq'),
  schema: z.object({
    pergunta: z.string(),
    tema: z.enum(['reservas', 'precos', 'idade', 'convivencia', 'jogos']),
    ordem,
  }),
})

/** Regras da casa, uma seção por arquivo Markdown. */
const regras = defineCollection({
  loader: textos('regras'),
  schema: z.object({ titulo: z.string(), ordem }),
})

/** Itens da lanchonete. */
const cardapio = defineCollection({
  loader: dados('cardapio'),
  schema: z.object({
    nome: z.string(),
    categoria: z.enum(['bebidas', 'salgados', 'lanches', 'doces']),
    preco: dinheiro,
    disponivel: z.boolean().default(true),
    ordem,
  }),
})

/** Agenda e histórico de campeonatos. */
const campeonatos = defineCollection({
  loader: dados('campeonatos'),
  schema: z.object({
    nome: z.string(),
    jogo: z.string(),
    data: z.coerce.date(),
    formato: z.string().optional(),
    inscricao: dinheiro.optional(),
    premio: z.string().optional(),
    linkInscricao: z.url().optional(),
    campeao: z.string().optional(),
  }),
})

/** Avisos temporários no topo do site (feriado, Corujão confirmado…). */
const avisos = defineCollection({
  loader: dados('avisos'),
  schema: z
    .object({
      texto: z.string().max(140, 'Avisos com até 140 caracteres cabem em uma linha no celular'),
      link: z.object({ href: z.string(), rotulo: z.string() }).optional(),
      inicio: z.coerce.date(),
      fim: z.coerce.date(),
      tom: z.enum(['info', 'alerta']).default('info'),
    })
    .refine((a) => a.fim >= a.inicio, {
      message: 'A data de fim precisa ser depois do início',
      path: ['fim'],
    }),
})

export const collections = {
  site,
  salas,
  planos,
  horarios,
  jogos,
  avaliacoes,
  faq,
  regras,
  cardapio,
  campeonatos,
  avisos,
}
