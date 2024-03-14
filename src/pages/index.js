import { Button } from "react-daisyui";
import Hero from "@/components/Hero";
import Image from "next/image";
import image01 from '../assets/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg'
import image02 from "../assets/jose-gil-2pNdTBn4C7U-unsplash.jpg"
import image03 from "../assets/nikita-kostrykin-JmUl_t_v3dw-unsplash.jpg"
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { SiGamebanana } from "react-icons/si";
import { MdGamepad } from "react-icons/md";

export default function Home() {


  return (
    <div className="home md:grid md:grid-flow-row flex flex-wrap flex-col">

      <Hero />
      
      <div className="grid md:grid-cols-2 gap-2 relative">

          <div className="p-4 flex items-center justify-center">

            <h2 className="text-l text-center m-32">For cross-platform gamers</h2>

            <div class="icon-1 absolute top-8 right-8">
              <IoGameControllerOutline 
              className="text-6xl" 
              role="img" aria-hidden="true"
              />
            </div>

          </div>

          <div class="image-blend-screen">
            <Image src={image01} alt="a collection of retro game `paraphernalia" />
          </div>

      </div>

      <div className="grid md:grid-cols-2 gap-2">

        <div className="p-4 flex items-center justify-center md:order-last relative">

            <h2 className="text-xl text-center m-32">Search games from any platform, including Steam and Itch.</h2>

            <div class="icon-1 absolute top-8 left-8">
              <SiGamebanana 
              className="text-6xl" 
              role="img" aria-hidden="true"
              />
            </div>

          </div>

        <div className="image-blend-screen md:order-first">
          <Image src={image02} alt="an Xbox controller on a backlit mousepad" />
        </div>
        
      </div>
      
      <div className="grid md:grid-cols-2 gap-2 relative">
      
        <div className="flex flex-col items-center justify-center m-32">

          <div class="icon-1 absolute top-8 right-8">
            <MdGamepad
            className="text-6xl" 
            role="img" aria-hidden="true"
            />
          </div>

          <h2 className="text-xl text-center">Ready to explore?</h2>

          <Button className="mt-4">
            <Link href="/search">
              Search now!
            </Link>
          </Button>

        </div>
        
      </div>
      

    </div>
  )
}
