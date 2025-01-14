import { Button } from '@/components/ui/button'
import { SOCIAL_MEDIA } from '@/data/social-media'

export function Footer() {
  return (
    <footer
      className="sticky bottom-0 flex flex-col rounded-t-lg border-b-2 border-primary bg-neutral-900 px-5 py-6
        md:py-8"
    >
      <ul className="mx-auto flex w-full max-w-md justify-between">
        {SOCIAL_MEDIA.map(({ title, href, icon: Icon }) => (
          <li key={title} className="flex">
            <Button size="icon" variant="ghost" asChild>
              <a
                className="flex size-8 items-center justify-center hover:text-neutral-50/90"
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
      </ul>

      <p className="mx-auto my-6 max-w-[17.75rem] text-center text-sm md:max-w-screen-xl md:text-base">
        Av. Cupecê, 6062 - Bloco 1, Loja 16, Jardim Prudência, São Paulo - SP
      </p>
      <p className="text-center text-xs text-neutral-300 md:text-sm">
        LGX E-Sport Arena. Todos os direitos reservados.
      </p>
    </footer>
  )
}
