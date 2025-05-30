import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitchLine,
  RiWhatsappLine,
  RiYoutubeLine,
} from 'react-icons/ri'

import { Socials } from '@/enums/socials'

export const SOCIAL_MEDIA = [
  {
    title: 'Abrir Instagram da LGX',
    href: Socials.INSTAGRAM,
    icon: RiInstagramLine,
  },
  {
    title: 'Abrir WhatsApp da LGX',
    href: Socials.WHATSAPP,
    icon: RiWhatsappLine,
  },
  {
    title: 'Abrir Twitch da LGX',
    href: Socials.TWITCH,
    icon: RiTwitchLine,
  },
  {
    title: 'Abrir YouTube da LGX',
    href: Socials.YOUTUBE,
    icon: RiYoutubeLine,
  },
  {
    title: 'Abrir Facebook da LGX',
    href: Socials.FACEBOOK,
    icon: RiFacebookCircleLine,
  },
]
