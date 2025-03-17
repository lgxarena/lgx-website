'use client'

import { useSyncExternalStore } from 'react'

export function useIsMobile() {
  const subscribe = () => () => {}

  const getSnapshot = () => {
    if (typeof navigator === 'undefined') return false

    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    return mobileRegex.test(navigator.userAgent.toLowerCase())
  }

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
