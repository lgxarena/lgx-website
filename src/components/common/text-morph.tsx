import { AnimatePresence, motion } from 'motion/react'
import { useId, useMemo } from 'react'

type TextMorphProps = {
  children: string
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
}

export function TextMorph({ children, as: Component = 'p', className, style }: TextMorphProps) {
  const uniqueId = useId()

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {}

    return children.split('').map((char) => {
      const key = char === ' ' ? 'space' : char
      charCounts[key] = (charCounts[key] || 0) + 1

      return {
        id: `${uniqueId}-${key}${charCounts[key]}`,
        label: char === ' ' ? '\u00A0' : char,
      }
    })
  }, [children, uniqueId])

  return (
    <Component key={children} aria-label={children} className={className} style={style}>
      <AnimatePresence mode="popLayout">
        {characters.map((character) => (
          <motion.span
            key={character.id}
            animate={{ opacity: 1 }}
            aria-hidden="true"
            className="inline-block"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            layoutId={character.id}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              mass: 0.2,
            }}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  )
}
