// import Image from 'next/image'
import { Pixelify_Sans } from 'next/font/google'

const pixelifySans = Pixelify_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={pixelifySans.className}>
      <button className="btn btn-primary">Test</button>
      <h1>GameList GAMELIST</h1>
    </main>
  )
}
