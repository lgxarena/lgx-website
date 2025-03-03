import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type TextareaProps = ComponentProps<'textarea'>

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        `h-auto w-full rounded-md bg-neutral-900 p-3 text-sm scrollbar-thin placeholder:text-neutral-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-50
        disabled:cursor-not-allowed`,
        className
      )}
      {...props}
    />
  )
}
