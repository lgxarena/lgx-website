import { motion } from 'motion/react'
import { MouseEvent } from 'react'

import { TabButton } from '@/components/ui/tab-button'
import { Room } from '@/hooks/use-room-tabs'
import { cn } from '@/utils/cn'

type RoomTabsProps = {
  className?: string
  room: Room
  onChangeRoom: (event: MouseEvent<HTMLButtonElement>) => void
}

export function RoomTabs({ className, room, onChangeRoom }: RoomTabsProps) {
  const isPro = room === 'pro'
  return (
    <div
      className={cn('relative mt-4 flex w-full max-w-screen-xl gap-2', className)}
      role="tablist"
    >
      <TabButton id="pro" isSelected={isPro} onClick={onChangeRoom}>
        Sala Pro
      </TabButton>
      <TabButton id="vip" isSelected={!isPro} onClick={onChangeRoom}>
        Sala VIP
      </TabButton>

      <motion.span
        animate={{ x: isPro ? '0%' : '100%' }}
        className="absolute bottom-0 left-0 h-full w-1/2 rounded-md bg-neutral-900"
        initial={false}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}
