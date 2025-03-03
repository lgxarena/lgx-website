import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type TextareaProps = ComponentProps<'textarea'>

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'h-11 w-full rounded-md bg-neutral-900 px-3 text-sm placeholder:text-neutral-300',
        className
      )}
      {...props}
    />
  )
}
