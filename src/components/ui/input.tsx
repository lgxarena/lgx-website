import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type InputProps = ComponentProps<'input'>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-md bg-neutral-900 px-3 text-sm placeholder:text-neutral-300',
        className
      )}
      {...props}
    />
  )
}
