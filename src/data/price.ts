import { Room } from '@/hooks/use-room-tabs'

type Price = {
  title: string
  price: number
}

export const PRICES = {
  pro: [
    { title: '1 Hora', price: 12 },
    { title: '3 Horas', price: 30 },
    { title: '5 Horas', price: 45 },
    { title: '10 Horas', price: 88 },
    { title: 'Corujinha', price: 40 },
    { title: 'Corujão', price: 90 },
  ],
  vip: [
    { title: '1 Hora', price: 7 },
    { title: '3 Horas', price: 18 },
    { title: '5 Horas', price: 30 },
    { title: '10 Horas', price: 57 },
    { title: 'Corujinha', price: 22 },
    { title: 'Corujão', price: 60 },
  ],
} satisfies Record<Room, Price[]>
