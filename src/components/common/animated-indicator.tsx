'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type AnimatedIndicatorProps = ComponentProps<typeof motion.span> & {
  rect: DOMRect | undefined
}

export function AnimatedIndicator({ className, rect, ...props }: AnimatedIndicatorProps) {
  const defaultStyle = {
    top: rect?.top,
    left: rect?.left,
    width: rect?.width,
    height: rect?.height,
  }

  return (
    <AnimatePresence>
      {rect && (
        <motion.span
          transition={{ duration: 0.15 }}
          animate={{
            ...defaultStyle,
            opacity: 1,
          }}
          className={cn(
            'absolute left-0 top-0 size-full rounded-md bg-neutral-900 transition-colors',
            className
          )}
          exit={{
            ...defaultStyle,
            opacity: 0,
          }}
          initial={{
            ...defaultStyle,
            opacity: 0,
          }}
          {...props}
        />
      )}
    </AnimatePresence>
  )
}
