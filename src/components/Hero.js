import { Button } from "react-daisyui";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
    return (
        <div className="home-hero p-2 flex flex-col items-center justify-center gap-8 w-full relative height-minus-nav">

            <h1 className="lg:text-9xl text-6xl break-all text-center">GameList</h1>

            <h2 className="text-l text-center">Create the endless backlog of your dreams!</h2>

            {/* <Button className="mt-4">
            <Link href="/search">
                Search now!
            </Link>
            </Button> */}

            <div className="icon-1 absolute bottom-8">
                <FaArrowDown 
                className="text-6xl" 
                role="img" aria-hidden="true"
                />
            </div>
        </div>
    )
}