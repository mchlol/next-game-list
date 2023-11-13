import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Silkscreen } from 'next/font/google';
import { Button } from 'react-daisyui'

const inter = Inter({ subsets: ['latin'] })
const silkscreen = Silkscreen( {
  subsets: ['latin'],
  weight: ['400','700'],
  display: 'swap',
  variable: '--font-silkscreen',
});

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${silkscreen.className}`}
    >
      <Button color="primary">Button</Button>
    </main>
  )
}
