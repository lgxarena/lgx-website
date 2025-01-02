'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'

type UseScrollLockProps = {
  autoLock?: boolean
  lockTarget?: HTMLElement | string
  widthReflow?: boolean
}

export const useScrollLock = ({
  autoLock = true,
  lockTarget,
  widthReflow = true,
}: UseScrollLockProps = {}) => {
  const [isLocked, setIsLocked] = useState(false)
  const target = useRef<HTMLElement | null>(null)
  const originalStyle = useRef<{ overflow: string; paddingRight: string } | null>(null)

  const lock = useCallback(() => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style

      originalStyle.current = { overflow, paddingRight }

      if (widthReflow) {
        const offsetWidth =
          target.current === document.body ? window.innerWidth : target.current.offsetWidth
        const currentPaddingRight =
          parseInt(window.getComputedStyle(target.current).paddingRight, 10) || 0

        const scrollbarWidth = offsetWidth - target.current.scrollWidth
        target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`
      }

      target.current.style.overflow = 'hidden'

      setIsLocked(true)
    }
  }, [widthReflow])

  const unlock = useCallback(() => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow

      if (widthReflow) {
        target.current.style.paddingRight = originalStyle.current.paddingRight
      }
    }

    setIsLocked(false)
  }, [widthReflow])

  useLayoutEffect(() => {
    if (lockTarget) {
      target.current =
        typeof lockTarget === 'string' ? document.querySelector(lockTarget) : lockTarget
    }

    if (!target.current) {
      target.current = document.body
    }

    if (autoLock) {
      lock()
    }

    return () => {
      unlock()
    }
  }, [autoLock, lock, lockTarget, unlock])

  return { isLocked, lock, unlock }
}
