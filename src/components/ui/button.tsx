import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 text-sm font-medium
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-50
  disabled:pointer-events-none disabled:opacity-60 md:h-12`,
  {
    variants: {
      variant: {
        default: 'bg-primary text-neutral-50 hover:bg-primary/90',
        secondary: 'bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90',
        ghost: 'bg-transparent hover:bg-neutral-900',
      },
      size: {
        default: 'h-11',
        sm: 'h-10',
        icon: 'size-8 px-0 md:size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
