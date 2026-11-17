import { Room } from '@/hooks/use-room-tabs'

type Price = {
  title: string
  price: number
  description?: string
}

export const PRICES = {
  pro: [
    { title: '1 Hora', price: 12 },
    { title: '3 Horas', price: 30 },
    { title: '5 Horas', price: 45 },
    { title: '10 Horas', price: 88 },
    { title: 'Pacote Econômico PRO', price: 40, description: '4h · válido das 11h às 18h' },
    { title: 'Corujinha', price: 50, description: 'Das 22h às 02h' },
    { title: 'Corujão', price: 90 },
  ],
  vip: [
    { title: '1 Hora', price: 7 },
    { title: '3 Horas', price: 18 },
    { title: '5 Horas', price: 30 },
    { title: '10 Horas', price: 57 },
    { title: 'Pacote Econômico VIP', price: 22, description: '4h · válido das 11h às 18h' },
    { title: 'Corujinha', price: 35, description: 'Das 22h às 02h' },
    { title: 'Corujão', price: 60 },
  ],
} satisfies Record<Room, Price[]>
