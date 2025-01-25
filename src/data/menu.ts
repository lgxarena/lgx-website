export const MOBILE_MENU = [
  {
    title: 'Página inicial',
    href: '/',
  },
  {
    title: 'Sobre',
    href: '/sobre',
  },
  {
    title: 'Horários',
    href: '/#horarios',
  },
  {
    title: 'Preços',
    href: '/#precos',
  },
  {
    title: 'Setup',
    href: '/#setup',
  },
  {
    title: 'Jogos',
    href: '/jogos',
  },
  {
    title: 'Regras',
    href: '/regras.pdf',
  },
  {
    title: 'Corujão',
    href: '/corujao',
  },
  { title: 'Eventos', href: '/eventos' },
  { title: 'Contato', href: '/contato' },
] as const

type DesktopMenuItemBase = {
  title: string
}

type DesktopMenuItemWithHref = DesktopMenuItemBase & {
  href: string
  children?: never
}

type DesktopMenuItemWithChildren = DesktopMenuItemBase & {
  children: { title: string; href: string }[]
  href?: never
}

type DesktopMenuItem = DesktopMenuItemWithChildren | DesktopMenuItemWithHref

export const DESKTOP_MENU: DesktopMenuItem[] = [
  {
    title: 'Página inicial',
    href: '/',
  },
  {
    title: 'Sobre',
    href: '/sobre',
  },
  {
    title: 'Informações',
    children: [
      {
        title: 'Horários',
        href: '/#horarios',
      },
      {
        title: 'Preços',
        href: '/#precos',
      },
      {
        title: 'Setup',
        href: '/#setup',
      },
      {
        title: 'Jogos',
        href: '/jogos',
      },
      {
        title: 'Regras',
        href: '/regras.pdf',
      },
    ],
  },
  {
    title: 'Corujão',
    href: '/corujao',
  },
  { title: 'Eventos', href: '/eventos' },
  { title: 'Contato', href: '/contato' },
] as const
