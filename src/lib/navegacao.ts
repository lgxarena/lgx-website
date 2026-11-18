export type ItemDeMenu = {
  rotulo: string
  href: string
  externo?: boolean
  /** Rotas que também deixam o item marcado como atual (ex.: as páginas de Eventos). */
  ativoEm?: string[]
  filhos?: { rotulo: string; href: string }[]
}

export const MENU_PRINCIPAL: ItemDeMenu[] = [
  { rotulo: 'Preços', href: '/precos' },
  { rotulo: 'Corujão', href: '/corujao' },
  { rotulo: 'O Espaço', href: '/espaco' },
  { rotulo: 'Jogos', href: '/jogos' },
  {
    rotulo: 'Eventos',
    href: '/aniversarios',
    ativoEm: ['/aniversarios', '/campeonatos', '/empresas'],
    filhos: [
      { rotulo: 'Aniversários', href: '/aniversarios' },
      { rotulo: 'Campeonatos', href: '/campeonatos' },
      { rotulo: 'Empresas & times', href: '/empresas' },
    ],
  },
  { rotulo: 'Rank', href: 'https://rank.lgxarena.com.br', externo: true },
]

export const MENU_AJUDA = [
  { rotulo: 'Perguntas frequentes', href: '/faq' },
  { rotulo: 'Cardápio', href: '/cardapio' },
  { rotulo: 'Regras da casa', href: '/regras' },
  { rotulo: 'Como chegar', href: '/contato' },
]

/** "/precos.html", "/precos/" e "/precos" viram "/precos". */
export function normalizarCaminho(caminho: string) {
  const semExtensao = caminho.replace(/\.html$/, '').replace(/\/index$/, '/')
  return semExtensao.length > 1 ? semExtensao.replace(/\/$/, '') : semExtensao
}

export function estaAtivo(item: ItemDeMenu, caminhoAtual: string) {
  const atual = normalizarCaminho(caminhoAtual)
  return (item.ativoEm ?? [item.href]).includes(atual)
}
