/**
 * O que o site guarda no navegador e o que terceiros podem gravar. Fonte única para o banner,
 * a Política de Cookies e a Privacidade: ao incluir uma ferramenta nova (ex.: analytics, #24),
 * ela entra aqui; se for opcional, o banner passa a pedir aceite antes de ligá-la.
 */
export interface ItemDeCookie {
  nome: string
  fornecedor: string
  finalidade: string
  duracao: string
}

export interface CategoriaDeCookie {
  /** Âncora na Política de Cookies. */
  ancora: string
  titulo: string
  resumo: string
  itens: ItemDeCookie[]
}

/** Chave do aviso de cookies no armazenamento local (o banner não volta depois de "Entendi"). */
export const CHAVE_AVISO = 'lgx-aviso-cookies'
/** Ao mudar o que o site usa, aumente a versão: o aviso aparece de novo para todo mundo. */
export const VERSAO_AVISO = 1

export const categoriasDeCookie: CategoriaDeCookie[] = [
  {
    ancora: 'necessarios',
    titulo: 'Necessários',
    resumo: 'Fazem o site funcionar. Não rastreiam você e ficam só no seu navegador.',
    itens: [
      {
        nome: CHAVE_AVISO,
        fornecedor: 'LGX Arena',
        finalidade:
          'Lembra que você já viu o aviso de cookies. Fica no armazenamento local do navegador, não é um cookie.',
        duracao: 'Até você apagar',
      },
      {
        nome: 'Cache do app (service worker)',
        fornecedor: 'LGX Arena',
        finalidade:
          'Guarda páginas e imagens já visitadas para o site abrir mais rápido e sem internet.',
        duracao: 'Até você apagar ou o site atualizar',
      },
    ],
  },
  {
    ancora: 'terceiros',
    titulo: 'De terceiros: mapa do Google',
    resumo:
      'Só na página Como chegar. O mapa é do Google e, ao abrir, o Google pode gravar cookies dele.',
    itens: [
      {
        nome: 'Cookies do Google (por exemplo, NID)',
        fornecedor: 'Google',
        finalidade:
          'Usados pelo Google no mapa incorporado, segundo a política de privacidade do Google.',
        duracao: 'Definida pelo Google',
      },
    ],
  },
]
