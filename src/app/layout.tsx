import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LGX E-Sport Arena',
  description:
    'A LGX E-Sport Arena tem 144 m² com uma estrutura totalmente dedicada ao público gamer. Espaço esse para realização de competições, treino de times, confraternizações e eventos fechados.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-neutral text-neutral-50 antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster theme="dark" />
      </body>
    </html>
  )
}
