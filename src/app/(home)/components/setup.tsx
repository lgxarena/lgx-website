'use client'

import { RoomTabs } from '@/components/common/room-tabs'
import { TextMorph } from '@/components/common/text-morph'
import { HARDWARE, PERIPHERALS } from '@/data/setup'
import { useRoomTabs } from '@/hooks/use-room-tabs'

export function Setup() {
  const { room, changeRoom } = useRoomTabs()

  return (
    <>
      <RoomTabs room={room} onChangeRoom={changeRoom} />

      <div className="mt-2 flex w-full max-w-screen-xl flex-col gap-y-2 md:flex-row">
        <div className="flex w-full flex-col gap-3 rounded-md bg-neutral-900 p-5 md:gap-4 md:rounded-r-none md:p-6">
          <span className="text-sm font-medium text-neutral-300 md:text-base">Hardware</span>
          <ul className="flex flex-col gap-2">
            {HARDWARE[room].map(({ part, name }) => (
              <li key={part} className="leading-5 text-neutral-300">
                {part}: <TextMorph className="inline-flex text-neutral-50">{name}</TextMorph>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-md bg-neutral-900 p-5 md:gap-4 md:rounded-l-none md:p-6">
          <span className="text-sm font-medium text-neutral-300 md:text-base">Periféricos</span>
          <ul className="flex flex-col gap-2">
            {PERIPHERALS[room].map(({ part, name }) => (
              <li key={part} className="leading-5 text-neutral-300">
                {part}: <TextMorph className="inline-flex text-neutral-50">{name}</TextMorph>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
