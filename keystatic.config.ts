/**
 * Painel de edição (Keystatic, issues #26 e #27). Cada tela edita os mesmos arquivos de
 * `src/content/` que o site lê; as regras de validação continuam em src/content.config.ts.
 *
 * No `pnpm dev` o painel grava direto nos arquivos do computador (modo local). Com
 * `PUBLIC_PAINEL_GITHUB=sim` no .env ele usa o modo GitHub: login pela conta do GitHub e cada
 * "Salvar" vira um commit no repositório (só quem tem permissão de escrita consegue salvar).
 */
import { collection, config, fields, singleton } from '@keystatic/core'
import { createElement } from 'react'

import { categoriasDeJogo } from './src/content/categorias'
import { MODO_PAINEL_GITHUB } from './src/lib/painel'

const ordem = fields.integer({
  label: 'Ordem',
  description: 'Posição na lista: menor aparece primeiro.',
  defaultValue: 0,
  validation: { min: 0 },
})

const hora = (label: string, isRequired = true) =>
  fields.text({
    label,
    description: 'Formato HH:MM, por exemplo 22:00.',
    validation: {
      isRequired,
      pattern: { regex: /^(([01]\d|2[0-3]):[0-5]\d)?$/, message: 'Use HH:MM, por exemplo 22:00' },
    },
  })

const dinheiro = (label: string) =>
  fields.number({ label, step: 0.5, validation: { isRequired: true, min: 0.01 } })

/** Campo que dá nome ao item; o identificador vira o nome do arquivo e não deve mudar depois. */
const nomeDoItem = (label: string, description?: string, extra: object = {}) =>
  fields.slug({
    name: { label, description, ...extra },
    slug: {
      label: 'Nome do arquivo',
      description: 'Gerado a partir do nome. Evite mudar depois de criado.',
    },
  })

const itemSetup = fields.object({
  item: fields.text({ label: 'Item', validation: { isRequired: true } }),
  modelo: fields.text({ label: 'Modelo', validation: { isRequired: true } }),
})

export default config({
  storage: MODO_PAINEL_GITHUB
    ? { kind: 'github', repo: 'lgxarena/lgx-website' }
    : { kind: 'local' },
  locale: 'pt-BR',
  ui: {
    brand: {
      name: 'LGX Arena',
      // Símbolo do X da LGX (o mesmo do favicon) no topo do menu.
      mark: () => createElement('img', { src: '/favicon.svg', width: 24, height: 24, alt: '' }),
    },
    navigation: {
      Funcionamento: ['avisos', 'horarios', 'planos'],
      Conteúdo: ['jogos', 'cardapio', 'campeonatos', 'avaliacoes', 'faq', 'regras'],
      Configurações: ['salas', 'site'],
    },
  },

  singletons: {
    site: singleton({
      label: 'Dados do site',
      path: 'src/content/site/geral',
      format: { data: 'yaml' },
      schema: {
        nome: fields.text({ label: 'Nome', validation: { isRequired: true } }),
        descricao: fields.text({ label: 'Descrição curta', multiline: true }),
        fundacao: fields.integer({ label: 'Ano de fundação', validation: { isRequired: true } }),
        razaoSocial: fields.text({ label: 'Razão social', validation: { isRequired: true } }),
        cnpj: fields.text({ label: 'CNPJ', description: 'Formato 00.000.000/0000-00' }),
        telefone: fields.text({ label: 'Telefone', description: 'Formato +5511XXXXXXXX' }),
        whatsapp: fields.text({ label: 'WhatsApp', description: 'Só números: 5511XXXXXXXX' }),
        endereco: fields.object(
          {
            logradouro: fields.text({ label: 'Logradouro' }),
            bairro: fields.text({ label: 'Bairro' }),
            cidade: fields.text({ label: 'Cidade' }),
            uf: fields.text({ label: 'UF' }),
            cep: fields.text({ label: 'CEP' }),
            mapa: fields.url({ label: 'Link do Google Maps' }),
            geo: fields.object(
              {
                latitude: fields.number({ label: 'Latitude', step: 0.0000001 }),
                longitude: fields.number({ label: 'Longitude', step: 0.0000001 }),
              },
              { label: 'Coordenadas do pino' }
            ),
          },
          { label: 'Endereço' }
        ),
        redes: fields.object(
          {
            instagram: fields.url({ label: 'Instagram' }),
            tiktok: fields.url({ label: 'TikTok' }),
            twitch: fields.url({ label: 'Twitch' }),
            youtube: fields.url({ label: 'YouTube' }),
            facebook: fields.url({ label: 'Facebook' }),
          },
          { label: 'Redes sociais' }
        ),
        rank: fields.url({ label: 'Link do Rank' }),
      },
    }),
  },

  collections: {
    avisos: collection({
      label: 'Avisos no topo',
      path: 'src/content/avisos/*',
      slugField: 'texto',
      format: { data: 'yaml' },
      columns: ['texto', 'inicio', 'fim'],
      schema: {
        texto: nomeDoItem(
          'Texto do aviso',
          'Até 140 caracteres, para caber numa linha no celular.',
          { validation: { length: { min: 1, max: 140 } } }
        ),
        inicio: fields.date({ label: 'Aparece a partir de', validation: { isRequired: true } }),
        fim: fields.date({ label: 'Some depois de', validation: { isRequired: true } }),
        tom: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Informação', value: 'info' },
            { label: 'Alerta (fechado, mudança de horário)', value: 'alerta' },
          ],
          defaultValue: 'info',
        }),
        link: fields.object(
          {
            href: fields.text({ label: 'Endereço do link', description: 'Ex.: /corujao' }),
            rotulo: fields.text({ label: 'Texto do link', description: 'Ex.: Ver detalhes' }),
          },
          { label: 'Link (opcional)' }
        ),
      },
    }),

    horarios: collection({
      label: 'Horários',
      path: 'src/content/horarios/*',
      slugField: 'rotulo',
      format: { data: 'yaml' },
      columns: ['rotulo', 'abre', 'fecha'],
      schema: {
        rotulo: nomeDoItem('Nome', 'Ex.: Seg – Qui'),
        dias: fields.multiselect({
          label: 'Dias',
          description: 'Deixe vazio para o Corujão, que não tem dias fixos.',
          options: [
            { label: 'Segunda', value: 'segunda' },
            { label: 'Terça', value: 'terca' },
            { label: 'Quarta', value: 'quarta' },
            { label: 'Quinta', value: 'quinta' },
            { label: 'Sexta', value: 'sexta' },
            { label: 'Sábado', value: 'sabado' },
            { label: 'Domingo', value: 'domingo' },
            { label: 'Feriado', value: 'feriado' },
          ],
        }),
        abre: hora('Abre'),
        fecha: hora('Fecha'),
        observacao: fields.text({ label: 'Observação' }),
        destaque: fields.checkbox({ label: 'Destaque (Corujão)' }),
        ordem,
      },
    }),

    planos: collection({
      label: 'Preços e pacotes',
      path: 'src/content/planos/*',
      slugField: 'nome',
      format: { data: 'yaml' },
      columns: ['nome', 'tipo'],
      schema: {
        nome: nomeDoItem('Nome', 'Ex.: 3 horas, Corujão'),
        tipo: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Horas avulsas', value: 'avulso' },
            { label: 'Pacote', value: 'pacote' },
          ],
          defaultValue: 'avulso',
        }),
        horas: fields.integer({ label: 'Horas', validation: { isRequired: true, min: 1 } }),
        precos: fields.object(
          { pro: dinheiro('Sala Pro (R$)'), vip: dinheiro('Sala VIP (R$)') },
          { label: 'Preço por PC' }
        ),
        janela: fields.object(
          { inicio: hora('Começa', false), fim: hora('Termina', false) },
          { label: 'Horário do pacote', description: 'Só para pacotes.' }
        ),
        dias: fields.text({ label: 'Dias do pacote', description: 'Ex.: Sex e Sáb' }),
        observacao: fields.text({ label: 'Observação' }),
        destaque: fields.checkbox({ label: 'Destaque (preço em vermelho)' }),
        ordem,
      },
    }),

    jogos: collection({
      label: 'Jogos',
      path: 'src/content/jogos/*',
      slugField: 'nome',
      format: { data: 'yaml' },
      columns: ['nome', 'popular'],
      schema: {
        nome: nomeDoItem('Nome do jogo'),
        capa: fields.image({
          label: 'Capa',
          description: 'Vertical (3:4), de preferência 600×800 ou maior.',
          directory: 'src/content/jogos',
          publicPath: './',
          validation: { isRequired: true },
        }),
        categorias: fields.multiselect({
          label: 'Categorias',
          options: categoriasDeJogo.map((categoria) => ({ label: categoria, value: categoria })),
        }),
        popular: fields.checkbox({ label: 'Popular (aparece primeiro e na página inicial)' }),
      },
    }),

    cardapio: collection({
      label: 'Cardápio',
      path: 'src/content/cardapio/*',
      slugField: 'nome',
      format: { data: 'yaml' },
      columns: ['nome', 'categoria', 'preco'],
      schema: {
        nome: nomeDoItem('Item'),
        categoria: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Bebidas', value: 'bebidas' },
            { label: 'Salgados', value: 'salgados' },
            { label: 'Lanches', value: 'lanches' },
            { label: 'Doces', value: 'doces' },
          ],
          defaultValue: 'bebidas',
        }),
        preco: dinheiro('Preço (R$)'),
        disponivel: fields.checkbox({ label: 'Disponível', defaultValue: true }),
        ordem,
      },
    }),

    campeonatos: collection({
      label: 'Campeonatos',
      path: 'src/content/campeonatos/*',
      slugField: 'nome',
      format: { data: 'yaml' },
      columns: ['nome', 'jogo', 'data'],
      schema: {
        nome: nomeDoItem('Nome', 'Ex.: LGX CUP'),
        jogo: fields.text({ label: 'Jogo', validation: { isRequired: true } }),
        data: fields.date({ label: 'Data', validation: { isRequired: true } }),
        formato: fields.text({ label: 'Formato', description: 'Ex.: 5v5' }),
        inscricao: fields.number({ label: 'Inscrição (R$)', step: 0.5 }),
        premio: fields.text({ label: 'Prêmio' }),
        linkInscricao: fields.url({ label: 'Link de inscrição' }),
        campeao: fields.text({ label: 'Campeão', description: 'Preencha depois do campeonato.' }),
      },
    }),

    avaliacoes: collection({
      label: 'Avaliações do Google',
      path: 'src/content/avaliacoes/*',
      slugField: 'autor',
      format: { data: 'yaml' },
      columns: ['autor', 'nota', 'destaque'],
      schema: {
        autor: nomeDoItem('Nome de quem avaliou'),
        fotoAutor: fields.url({ label: 'Foto do perfil (link)' }),
        nota: fields.integer({
          label: 'Nota',
          defaultValue: 5,
          validation: { isRequired: true, min: 1, max: 5 },
        }),
        texto: fields.text({ label: 'Texto', multiline: true, validation: { isRequired: true } }),
        data: fields.date({ label: 'Data', validation: { isRequired: true } }),
        link: fields.url({ label: 'Link da avaliação no Google' }),
        destaque: fields.checkbox({ label: 'Mostrar no site' }),
      },
    }),

    faq: collection({
      label: 'Perguntas frequentes',
      path: 'src/content/faq/*',
      slugField: 'pergunta',
      format: { contentField: 'resposta' },
      columns: ['pergunta', 'tema'],
      schema: {
        pergunta: nomeDoItem('Pergunta'),
        tema: fields.select({
          label: 'Tema',
          options: [
            { label: 'Reservas e pagamento', value: 'reservas' },
            { label: 'Preços e tempo', value: 'precos' },
            { label: 'Idade e cadastro', value: 'idade' },
            { label: 'Comida e convivência', value: 'convivencia' },
            { label: 'Jogos e equipamentos', value: 'jogos' },
          ],
          defaultValue: 'reservas',
        }),
        ordem,
        resposta: fields.markdoc({ label: 'Resposta', extension: 'md' }),
      },
    }),

    regras: collection({
      label: 'Regras da casa',
      path: 'src/content/regras/*',
      slugField: 'titulo',
      format: { contentField: 'texto' },
      columns: ['titulo', 'ordem'],
      schema: {
        titulo: nomeDoItem('Título da seção'),
        ordem,
        texto: fields.markdoc({ label: 'Texto', extension: 'md' }),
      },
    }),

    salas: collection({
      label: 'Salas',
      path: 'src/content/salas/*',
      slugField: 'nome',
      format: { data: 'yaml' },
      columns: ['nome'],
      schema: {
        nome: nomeDoItem('Nome', 'Ex.: Sala Pro'),
        resumo: fields.text({ label: 'Resumo', description: 'Ex.: 144 Hz · GTX 1060 · i5 8400' }),
        foto: fields.image({
          label: 'Foto da sala',
          directory: 'src/content/salas',
          publicPath: './',
        }),
        hardware: fields.array(itemSetup, {
          label: 'Computador',
          itemLabel: (item) => `${item.fields.item.value}: ${item.fields.modelo.value}`,
        }),
        perifericos: fields.array(itemSetup, {
          label: 'Periféricos',
          itemLabel: (item) => `${item.fields.item.value}: ${item.fields.modelo.value}`,
        }),
        ordem,
      },
    }),
  },
})
