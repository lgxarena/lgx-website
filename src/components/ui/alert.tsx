import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export function Alert({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="alert"
      className={cn(
        `relative w-full rounded-lg border bg-neutral-900 p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute
        [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-50 [&>svg~*]:pl-7`,
        className
      )}
      {...props}
    />
  )
}

export function AlertTitle({ className, children, ...props }: ComponentProps<'h5'>) {
  return (
    <h5 className={cn('mb-2 font-medium leading-none tracking-tight', className)} {...props}>
      {children}
    </h5>
  )
}

export function AlertDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <div className={cn('text-sm text-neutral-300 [&_p]:leading-relaxed', className)} {...props} />
  )
}
