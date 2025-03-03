import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type FieldProps = ComponentProps<'div'>

export function Field({ className, ...props }: FieldProps) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />
}
