import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type LabelProps = ComponentProps<'label'>

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm', className)} {...props}>
      {children}
    </label>
  )
}
