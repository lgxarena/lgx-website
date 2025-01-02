'use client'

import { useState } from 'react'

type ElementRef = HTMLElement | null

export const useAnimatedHover = () => {
  const [elementRefs] = useState<ElementRef[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const rect = elementRefs[hoveredIndex ?? -1]?.getBoundingClientRect()

  const setRef = (element: ElementRef, index: number) => {
    elementRefs[index] = element
  }

  return {
    hoveredIndex,
    rect,
    setRef,
    setHoveredIndex,
  }
}
