import { Button } from "react-daisyui";
import Hero from "@/components/Hero";
import Image from "next/image";
import image01 from '../assets/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg'
import image02 from "../assets/jose-gil-2pNdTBn4C7U-unsplash.jpg"
// import image03 from "../assets/nikita-kostrykin-JmUl_t_v3dw-unsplash.jpg"
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { SiGamebanana } from "react-icons/si";
import { MdGamepad } from "react-icons/md";
import Banner from "@/components/Banner";

export default function Home() {

  return (
    <div className="home md:grid md:grid-flow-row flex flex-wrap flex-col">

      <Hero />

      <Banner>

        <Banner.Icon>
          <IoGameControllerOutline />
        </Banner.Icon>

        <Banner.Heading>
          For cross-platform gamers
        </Banner.Heading>

        <Banner.Text>
          Whether you're a PC aficionado, a console connoisseur, or an indie game enthusiast, we've got you covered. Simply search our extensive database spanning all platforms - PC, PlayStation, Xbox, and even indie gems on itch.io - and find the game that suits your style.
        </Banner.Text>

        <Banner.Image
        imageSrc={image01} 
        altText="a collection of retro game `paraphernalia" 
        />

      </Banner>
      
      {/* <div className="grid md:grid-cols-2 gap-2 relative">

          <div className="p-4 flex items-center justify-center">

            <div>
              <h2 className="text-l text-center m-32">For cross-platform gamers</h2>
              <p>Whether you're a PC aficionado, a console connoisseur, or an indie game enthusiast, we've got you covered. Simply search our extensive database spanning all platforms - PC, PlayStation, Xbox, and even indie gems on itch.io - and find the game that suits your style.</p>
            </div>

            <div className="icon-1 absolute top-8 right-8">
              <IoGameControllerOutline 
              className="text-6xl" 
              role="img" aria-hidden="true"
              />
            </div>

          </div>

          <div className="image-blend-screen">
            <Image className="fade-img" src={image01} alt="a collection of retro game `paraphernalia" />
          </div>

      </div> */}

      <div className="grid md:grid-cols-2 gap-2">

        <div className="p-4 flex items-center justify-center md:order-last relative">

            <div>
              <h2 className="text-xl text-center m-4">never miss out on an epic adventure again!</h2>
              
              <p>Save games you're interested in for later, and when you find those games that truly captivate you, add them to your favorites list for quick access whenever the gaming mood strikes.</p>
            </div>

            <div className="icon-1 absolute top-8 left-8">
              <SiGamebanana 
              className="text-6xl" 
              role="img" aria-hidden="true"
              />
            </div>

          </div>

        <div className="image-blend-screen md:order-first">
          <Image className="fade-img" src={image02} alt="an Xbox controller on a backlit mousepad" />
        </div>
        
      </div>
      
      <div className="grid md:grid-cols-1 gap-2 relative">
      
        <div className="flex flex-col items-center justify-center m-32">

          <div className="icon-1 absolute top-8 right-8">
            <MdGamepad
            className="text-6xl" 
            role="img" aria-hidden="true"
            />
          </div>

          <ul>
            <li><strong>One-Stop Gaming Hub:</strong> Access thousands of games across multiple platforms in one centralized location.</li>
            <li><strong>Save for Later:</strong> Create your personalized wishlist and keep track of games you're eager to play.</li>
            <li><strong>Never Miss a Beat:</strong> Easily save your favorite games for quick access and endless entertainment.</li>
          </ul>

          <h2 className="text-xl text-center">Ready to explore?</h2>

          <Button className="mt-4">
            <Link href="/searchgames">
              Search now!
            </Link>
          </Button>

        </div>
        
      </div>

      
      

    </div>
  )
}
