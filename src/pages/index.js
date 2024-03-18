import { Button, Card } from "react-daisyui";
import Hero from "@/components/Hero";
import Image from "next/image";
import image01 from '../assets/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg'
import image02 from "../assets/jose-gil-2pNdTBn4C7U-unsplash.jpg"
import image03 from "../assets/nikita-kostrykin-JmUl_t_v3dw-unsplash.jpg"
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import { SiGamebanana } from "react-icons/si";
import { SiGamejolt } from "react-icons/si";

import Banner from "@/components/Banner";

export default function Home() {

  return (
    <div className="home flex flex-col">

      <Hero />

        <Banner imageSrc={image01} altText="a collection of retro game paraphernalia" imagePosition="right">
          <Banner.Icon>
            <IoGameControllerOutline />
          </Banner.Icon>
          <Banner.Heading>
            For cross-platform gamers
          </Banner.Heading>
          <Banner.Text>
            Whether you're a PC aficionado, a console connoisseur, or an indie game enthusiast, we've got you covered. Simply search our extensive database spanning all platforms - PC, PlayStation, Xbox, and even indie gems on itch.io - and find the game that suits your style.
          </Banner.Text>
        </Banner>
        <Banner imageSrc={image02} altText="an Xbox controller on a mousepad" imagePosition="left">
          <Banner.Icon>
            <SiGamebanana />
          </Banner.Icon>
          <Banner.Heading>
            Never miss out on an epic adventure again!
          </Banner.Heading>
          <Banner.Text>
            Save games you're interested in for later, and when you find those games that truly captivate you, add them to your favorites list for quick access whenever the gaming mood strikes.
          </Banner.Text>
        </Banner>
      
      {/* Last row */}
      <div className="relative">
      
        <div className="flex flex-col items-center justify-center gap-8 m-32">

          <div className="icon-1 absolute top-8">
            <SiGamejolt
            className="text-4xl" 
            role="img" aria-hidden="true"
            />
          </div>

          <Card imageFull bordered={false} className="text-primary md:max-w-md">
            <Card.Image src={image03.src} alt="image"/>

            <Card.Body className="flex flex-col justify-center items-center bg-secondary/50">
              <Card.Title tag="h2" className="md:text-2xl text-center text-neutral" style={{textShadow: '2px 2px 5px #b646ba'}}>Ready to explore?</Card.Title>
            
              <Card.Actions className="justify-center">
                <Button className="mt-4">
                  <Link href="/search">
                    Search now!
                  </Link>
                </Button>
              </Card.Actions>

            </Card.Body>

          </Card>

          

        </div>
        
      </div>

      
      

    </div>
  )
}
