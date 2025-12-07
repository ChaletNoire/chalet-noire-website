import localFont from 'next/font/local'

export const lyon = localFont({
  src: [
    {
      path: '../assets/fonts/lyon/lyon.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lyon/lyon.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lyon/lyon.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-lyon',
  display: 'swap',
})
