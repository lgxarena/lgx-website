import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LGX Arena',
    short_name: 'LGX',
    description:
      'A LGX Arena tem 144 m² com uma estrutura totalmente dedicada ao público gamer. Espaço esse para realização de competições, treino de times, confraternizações e eventos fechados.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E0E0E',
    theme_color: '#0E0E0E',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
