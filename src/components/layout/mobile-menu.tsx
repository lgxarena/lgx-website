'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RiCloseLine, RiMenuLine } from 'react-icons/ri'

import { Button } from '@/components/ui/button'
import { MOBILE_MENU } from '@/data/menu'
import { SOCIAL_MEDIA } from '@/data/social-media'
import { useBackButton } from '@/hooks/use-back-button'
import { useKeyPress } from '@/hooks/use-key-press'
import { useScrollLock } from '@/hooks/use-scroll-lock'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setIsMenuOpen(false)
  const handleToggleMenuState = () => setIsMenuOpen((prev) => !prev)

  useScrollLock({ autoLock: isMenuOpen })
  useBackButton(closeMenu)
  useKeyPress(['Escape'], closeMenu)

  const bookText = generateWhatsAppLink(
    'Olá, gostaria de fazer uma reserva para [inserir data e horário].'
  )

  useEffect(() => {
    closeMenu()
  }, [pathname])

  return (
    <>
      <Button
        aria-controls="menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        className="relative flex size-8 flex-col items-center justify-center gap-1 lg:hidden"
        size="icon"
        variant="ghost"
        onClick={handleToggleMenuState}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          transition={{ duration: 0.2 }}
          animate={{
            opacity: isMenuOpen ? 0 : 1,
            scale: isMenuOpen ? 0 : 1,
          }}
        >
          <RiMenuLine size={24} />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          transition={{ duration: 0.2 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            scale: isMenuOpen ? 1 : 0,
          }}
        >
          <RiCloseLine size={24} />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby="menu-button"
            exit={{ opacity: 0, y: 20 }}
            id="menu"
            initial={{ opacity: 0, y: 20 }}
            role="menu"
            transition={{ type: 'spring', damping: 10, mass: 0.5 }}
            className="absolute inset-x-0 top-[72px] flex h-[calc(100dvh-72px)] flex-col gap-10 rounded-t-lg bg-neutral-900
              p-5 lg:hidden"
          >
            <ul className="flex flex-1 flex-col gap-4">
              {MOBILE_MENU.map(({ title, href }) => (
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
                className="mx-auto flex max-w-md justify-between"
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
              <Button className="w-full" asChild>
                <a href={bookText} rel="noreferrer" target="_blank">
                  Faça sua reserva
                </a>
              </Button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
