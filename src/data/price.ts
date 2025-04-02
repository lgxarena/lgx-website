import { Room } from '@/hooks/use-room-tabs'

type Price = {
  title: string
  price: number
}

export const PRICES = {
  pro: [
    { title: '1 Hora', price: 7 },
    { title: '3 Horas', price: 18 },
    { title: '5 Horas', price: 30 },
    { title: '10 Horas', price: 55 },
    { title: '20 Horas', price: 95 },
    { title: 'Corujinha', price: 22 },
    { title: 'Corujão', price: 50 },
  ],
  vip: [
    { title: '1 Hora', price: 5 },
    { title: '3 Horas', price: 12 },
    { title: '5 Horas', price: 20 },
    { title: '10 Horas', price: 38 },
    { title: '20 Horas', price: 75 },
    { title: 'Corujinha', price: 15 },
    { title: 'Corujão', price: 32 },
  ],
} satisfies Record<Room, Price[]>
