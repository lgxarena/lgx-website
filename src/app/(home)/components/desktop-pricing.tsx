'use client'

import { Fragment } from 'react'

import { PRICES } from '@/data/price'
import { Room } from '@/hooks/use-room-tabs'
import { formatCurrency } from '@/utils/format-currency'

export function DesktopPricing() {
  return (
    <div className="my-4 hidden w-full max-w-screen-xl gap-3 md:flex">
      {Object.entries(PRICES).map(([key, room]) => (
        <dl
          key={key}
          className="grid w-full grid-cols-2 gap-3 rounded-md bg-neutral-900 p-6 font-medium"
        >
          <span className="col-span-full font-medium text-neutral-300">
            {(key as Room) === 'pro' ? 'Sala Pro' : 'Sala VIP'}
          </span>
          {room.map(({ title, price }) => (
            <Fragment key={title}>
              <dt className="font-semibold">{title}</dt>
              <dd className="text-right font-semibold">{formatCurrency(price)}</dd>
            </Fragment>
          ))}
        </dl>
      ))}
    </div>
  )
}
