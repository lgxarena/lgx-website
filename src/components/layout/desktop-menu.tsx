'use client'

import Link from 'next/link'
import { useState } from 'react'

import { AnimatedIndicator } from '@/components/common/animated-indicator'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DESKTOP_MENU } from '@/data/menu'
import { useAnimatedHover } from '@/hooks/use-animated-hover'
import { useScrollLock } from '@/hooks/use-scroll-lock'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'

export function DesktopMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { rect, setHoveredIndex, setRef } = useAnimatedHover()

  useScrollLock({ autoLock: isOpen })

  const bookText = generateWhatsAppLink(
    'Olá, gostaria de fazer uma reserva para [inserir data e horário].'
  )

  return (
    <div className="hidden gap-2 lg:flex">
      <ul
        className="flex flex-1 items-center justify-between gap-2"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {DESKTOP_MENU.map((props, index) => {
          if (props.children) {
            return (
              <li key={props.title} ref={(el) => setRef(el, index)} className="z-10">
                <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger
                    className="inline-flex h-10 items-center rounded-md px-3 transition-colors focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-neutral-50"
                    onPointerEnter={() => setHoveredIndex(index)}
                  >
                    {props.title}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48"
                    sideOffset={11}
                    onCloseAutoFocus={(event) => event.preventDefault()}
                  >
                    {props.children.map((child) => (
                      <DropdownMenuItem key={child.title} asChild>
                        <Link
                          className="cursor-pointer"
                          href={child.href}
                          target={child.href.includes('pdf') ? '_blank' : '_self'}
                        >
                          {child.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuArrow />
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )
          }

          return (
            <li key={props.title} ref={(el) => setRef(el, index)} className="z-10">
              <Link
                href={props.href}
                className="inline-flex h-10 items-center rounded-md px-3 transition-colors focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-neutral-50"
                onPointerEnter={() => setHoveredIndex(index)}
              >
                {props.title}
              </Link>
            </li>
          )
        })}

        <AnimatedIndicator rect={rect} />
      </ul>

      <Button size="sm" asChild>
        <a href={bookText} rel="noreferrer" target="_blank">
          Faça sua reserva
        </a>
      </Button>
    </div>
  )
}
