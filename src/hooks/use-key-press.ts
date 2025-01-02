'use client'

import { RefObject, useEffect } from 'react'

type TargetType = HTMLElement | null

type Options<T extends TargetType> = {
  shiftKey?: boolean
  altKey?: boolean
  ctrlKey?: boolean
  ref?: RefObject<T>
}

type UseKeyPress = <T extends TargetType>(
  keys: string[],
  callback: (event: Event) => void,
  options?: Options<T>
) => void

export const useKeyPress: UseKeyPress = (keys, callback, options) => {
  useEffect(() => {
    const element = options?.ref?.current ?? window

    const handler: EventListenerOrEventListenerObject = (event) => {
      const { shiftKey, altKey, ctrlKey } = options ?? {}

      if (
        event instanceof KeyboardEvent &&
        keys.includes(event.key) &&
        (!shiftKey || event.shiftKey) &&
        (!altKey || event.altKey) &&
        (!ctrlKey || event.ctrlKey)
      ) {
        callback(event)
      }
    }

    element.addEventListener('keydown', handler)

    return () => {
      element.removeEventListener('keydown', handler)
    }
  }, [keys, callback, options])
}
