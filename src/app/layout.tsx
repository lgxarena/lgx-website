import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lgxarena.com.br'),
  title: 'LGX Arena',
  description:
    'A LGX Arena tem 144 m² com uma estrutura totalmente dedicada ao público gamer. Espaço esse para realização de competições, treino de times, confraternizações e eventos fechados.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'LGX Arena',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
  name: 'LGX Arena',
  url: 'https://lgxarena.com.br',
  logo: 'https://lgxarena.com.br/images/brand.png',
  telephone: '+55-11-5623-4874',
  priceRange: 'R$',
  foundingDate: '2006',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Cupecê, 6062 - Bloco 1, Loja 16',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '11:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '11:00',
      closes: '21:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '14:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://instagram.com/lgxarena',
    'https://tiktok.com/@lgxlan',
    'https://twitch.tv/lgxarena',
    'https://www.youtube.com/@lgxarena',
    'https://www.facebook.com/lgxarenasp',
  ],
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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          type="application/ld+json"
        />
      </body>
    </html>
  )
}
