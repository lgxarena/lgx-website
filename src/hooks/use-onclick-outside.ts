'use client'

import { RefObject, useEffect } from 'react'

type Options = {
  ignoreRef?: RefObject<HTMLElement | null>
}

type UseOnClickOutside = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  options?: Options
) => void

export const useOnClickOutside: UseOnClickOutside = (ref, callback, options) => {
  useEffect(() => {
    const abortController = new AbortController()

    const onClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node

      const isInsideRef = ref.current?.contains(target) ?? false
      const isInsideIgnoreRef = options?.ignoreRef?.current?.contains(target) ?? false

      if (isInsideRef || isInsideIgnoreRef) return

      callback(event)
    }

    document.addEventListener('mousedown', onClickOutside, { signal: abortController.signal })
    document.addEventListener('touchstart', onClickOutside, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }, [ref, callback, options])
}
