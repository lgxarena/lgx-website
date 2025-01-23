import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type TabButtonProps = ComponentProps<'button'> & {
  id: string
  isSelected: boolean
}

export function TabButton({ children, className, isSelected, ...props }: TabButtonProps) {
  return (
    <button
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
