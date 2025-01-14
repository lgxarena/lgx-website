'use client'

import { motion } from 'motion/react'
import { Fragment, MouseEvent, useState } from 'react'

import { TextMorph } from '@/components/common/text-morph'
import { TabButton } from '@/components/ui/tab-button'
import { PRICES } from '@/data/price'
import { formatCurrency } from '@/utils/format-currency'

type Tab = 'common' | 'vip'

export function MobilePricing() {
  const [activeTab, setActiveTab] = useState<Tab>('vip')

  const handleTabChange = (event: MouseEvent<HTMLButtonElement>) => {
    const tab = event.currentTarget.id as Tab
    setActiveTab(tab)
  }

  return (
    <>
      <div
        aria-labelledby="price-tab"
        className="relative mt-4 flex w-full max-w-screen-xl gap-2 md:hidden"
        role="tablist"
      >
        <TabButton<Tab>
          id="vip"
          isSelected={activeTab === 'vip'}
          tabPanelId="tabpanel-vip"
          onClick={handleTabChange}
        >
          Sala VIP
        </TabButton>
        <TabButton<Tab>
          id="common"
          isSelected={activeTab === 'common'}
          tabPanelId="tabpanel-common"
          onClick={handleTabChange}
        >
          Sala Comum
        </TabButton>

        <motion.span
          animate={{ x: activeTab === 'vip' ? '0%' : '100%' }}
          className="absolute bottom-0 left-0 h-full w-1/2 rounded-md bg-neutral-900"
          initial={false}
          transition={{ duration: 0.15 }}
        />
      </div>

      <dl
        className="mb-4 mt-2 grid w-full max-w-screen-xl grid-cols-2 gap-3 rounded-md bg-neutral-900 p-5 font-medium
          md:hidden"
      >
        {PRICES[activeTab].map(({ title, price }) => (
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
