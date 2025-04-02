import { Room } from '@/hooks/use-room-tabs'

type SetupItem = {
  part: string
  name: string
}

export const HARDWARE = {
  pro: [
    { part: 'Processador', name: 'Intel Core i5 13400' },
    { part: 'Memória', name: '16GB DDR5 5600 MHz' },
    { part: 'Placa de Vídeo', name: 'RTX 3060 12GB' },
    { part: 'Monitor', name: 'Alienware 25” 360Hz 0.5ms' },
  ],
  vip: [
    { part: 'Processador', name: 'Intel Core i5 8400' },
    { part: 'Memória', name: '16GB DDR4 2666 MHz' },
    { part: 'Placa de Vídeo', name: 'GTX 1060 6GB' },
    { part: 'Monitor', name: '24.5” 144Hz 1ms' },
  ],
} satisfies Record<Room, SetupItem[]>

export const PERIPHERALS = {
  pro: [
    { part: 'Teclado', name: 'Redragon Kumara' },
    { part: 'Mouse', name: 'Redragon Cobra' },
    { part: 'Headphone', name: 'Redragon Zeus' },
    { part: 'Mousepad', name: 'Redragon Flick L' },
  ],
  vip: [
    { part: 'Teclado', name: 'Redragon Kumara' },
    { part: 'Mouse', name: 'Redragon Cobra' },
    { part: 'Headphone', name: 'Redragon Zeus' },
    { part: 'Mousepad', name: 'Redragon Flick L' },
  ],
} satisfies Record<Room, SetupItem[]>
