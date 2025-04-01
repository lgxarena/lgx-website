import twScrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import twAnimate from 'tailwindcss-animate'
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: ['class'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      neutral: {
        50: '#F2F2F2',
        100: '#E7E7E7',
        200: '#D1D1D1',
        300: '#B0B0B0',
        400: '#888888',
        500: '#6D6D6D',
        600: '#5D5D5D',
        700: '#4F4F4F',
        800: '#454545',
        900: '#272727',
        DEFAULT: '#0E0E0E',
      },
      primary: {
        50: '#FFF1F1',
        100: '#FFE0E0',
        200: '#FFC7C7',
        300: '#FF9F9F',
        400: '#FF6868',
        DEFAULT: '#FA3232',
        600: '#E81A1A',
        700: '#C31212',
        800: '#A11313',
        900: '#851717',
        950: '#490606',
      },
    },
    extend: {
      backgroundImage: {
        'hero-mobile': 'url("/images/bg-mobile.webp")',
        'hero-desktop': 'url("/images/bg-desktop.webp")',
      },
    },
  },
  plugins: [
    twAnimate,
    twScrollbar,
    plugin(({ matchVariant }) => {
      matchVariant('not', (value) => `&:not(${value})`, {
        values: {
          disabled: ':disabled',
          checked: ':checked',
          placeholder: ':placeholder-shown',
        },
      })

      matchVariant('peer-not', (value) => `.peer:not(${value}) ~ &`, {
        values: {
          disabled: ':disabled',
          checked: ':checked',
          placeholder: ':placeholder-shown',
        },
      })

      matchVariant('group-not', (value) => `.group:not(${value}) ~ &`, {
        values: {
          disabled: ':disabled',
          checked: ':checked',
          placeholder: ':placeholder-shown',
        },
      })
    }),
  ],
} satisfies Config
