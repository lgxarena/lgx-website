import { Brand } from '@/components/common/brand'
import { DesktopMenu } from '@/components/layout/desktop-menu'
import { MobileMenu } from '@/components/layout/mobile-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[72px] items-center bg-neutral/90 py-2 pl-5 pr-3 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
        <Brand />

        <nav aria-label="Menu principal" role="navigation">
          <DesktopMenu />
          <MobileMenu />
        </nav>
      </div>
    </header>
  )
}
