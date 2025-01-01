import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
