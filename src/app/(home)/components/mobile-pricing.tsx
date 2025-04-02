'use client'

import { Fragment } from 'react'

import { RoomTabs } from '@/components/common/room-tabs'
import { TextMorph } from '@/components/common/text-morph'
import { PRICES } from '@/data/price'
import { useRoomTabs } from '@/hooks/use-room-tabs'
import { formatCurrency } from '@/utils/format-currency'

export function MobilePricing() {
  const { room, changeRoom } = useRoomTabs()

  return (
    <>
      <RoomTabs className="md:hidden" room={room} onChangeRoom={changeRoom} />

      <dl
        className="mb-4 mt-2 grid w-full max-w-screen-xl grid-cols-2 gap-3 rounded-md bg-neutral-900 p-5 font-medium
          md:hidden"
      >
        {PRICES[room].map(({ title, price }) => (
          <Fragment key={title}>
            <dt>{title}</dt>
            <TextMorph as="dd" className="text-right">
              {formatCurrency(price)}
            </TextMorph>
          </Fragment>
        ))}
      </dl>
    </>
  )
}
