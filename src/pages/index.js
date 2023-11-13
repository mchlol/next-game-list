import Image from 'next/image'
import { Silkscreen } from 'next/font/google';
import { Button } from 'react-daisyui'
import NavBar from '@/components/NavBar';
import AppFooter from '@/components/AppFooter';

const silkscreen = Silkscreen( {
  subsets: ['latin'],
  weight: ['400','700'],
  display: 'swap',
  variable: '--font-silkscreen',
});

export default function Home() {
  return (
    <main>
      <NavBar className={silkscreen.variable}/>
      <AppFooter />
    </main>
  )
}
