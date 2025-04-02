'use client'

import { MouseEvent, useState } from 'react'

export type Room = 'pro' | 'vip'

export function useRoomTabs() {
  const [room, setRoom] = useState<Room>('pro')

  const changeRoom = (event: MouseEvent<HTMLButtonElement>) => {
    const tab = event.currentTarget.id as Room
    setRoom(tab)
  }

  return { room, changeRoom }
}
