import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type TabButtonProps<T extends string> = ComponentProps<'button'> & {
  id: T
  isSelected: boolean
  tabPanelId: `tabpanel-${T}`
}

export function TabButton<T extends string>({
  children,
  className,
  isSelected,
  tabPanelId,
  ...props
}: TabButtonProps<T>) {
  return (
    <button
      aria-controls={tabPanelId}
      aria-selected={isSelected}
      role="tab"
      type="button"
      className={cn(
        `z-10 flex h-12 w-full items-center justify-center rounded-md bg-neutral-900 bg-transparent px-4
        text-sm font-medium text-neutral-300 transition-colors aria-selected:text-neutral-50
        hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-50
        disabled:pointer-events-none disabled:opacity-60 md:h-12`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
