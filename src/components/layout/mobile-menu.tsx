import { motion } from 'motion/react'
import Link from 'next/link'
import { forwardRef } from 'react'

import { MENU } from '@/data/menu'
import { SOCIAL_MEDIA } from '@/data/social-media'
import { useScrollLock } from '@/hooks/use-scroll-lock'

import { Button } from '../ui/button'

export const MobileMenu = forwardRef<HTMLDivElement>((_, ref) => {
  useScrollLock()

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-neutral/50 backdrop-blur-[1px]"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        ref={ref}
        animate={{ opacity: 1, y: 0 }}
        aria-labelledby="menu-button"
        exit={{ opacity: 0, y: 20 }}
        id="menu"
        initial={{ opacity: 0, y: 20 }}
        role="menu"
        transition={{ type: 'spring', damping: 10, mass: 0.5 }}
        className="absolute inset-x-3 top-[72px] flex h-[calc(100dvh-84px)] flex-col gap-10 rounded-lg bg-neutral-900
          p-5"
      >
        <ul className="flex flex-1 flex-col justify-between gap-4">
          {MENU.map(({ title, href }) => (
            <li key={title}>
              <Link
                className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-50"
                href={href}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-auto space-y-4">
          <motion.ul
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between"
            exit={{ y: 30, opacity: 0 }}
            initial={{ y: 30, opacity: 0 }}
            transition={{ delay: 0.15, type: 'spring', damping: 10, mass: 0.5 }}
          >
            {SOCIAL_MEDIA.map(({ title, href, icon: Icon }) => (
              <li key={title}>
                <Button size="icon" variant="ghost" asChild>
                  <a
                    className="flex size-8 items-center justify-center text-neutral-300"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon size={24} />
                    <span className="sr-only">{title}</span>
                  </a>
                </Button>
              </li>
            ))}
          </motion.ul>
          <Button className="w-full">Faça sua reserva</Button>
        </footer>
      </motion.div>
    </>
  )
})
MobileMenu.displayName = 'MobileMenu'
