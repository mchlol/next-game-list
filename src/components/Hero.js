import { Button } from "react-daisyui";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
    return (
        <div className="p-2 flex flex-col items-center justify-center gap-8 w-full pattern-bg relative"
        style={{minHeight: "calc(100vh - 4rem"}}>

            <h1 className="lg:text-9xl text-6xl break-all text-center text-shadow-pink">GameList</h1>

            <h2 className="text-lg md:text-3xl text-center">Create the <span className="text-shadow-pink">endless backlog</span> of your dreams!</h2>

            <Button className="mt-4">
            <Link href="/search">
                Go to search
            </Link>
            </Button>

            <div className="icon-1 absolute bottom-8">
                <FaArrowDown 
                className="text-6xl" 
                role="img" aria-hidden="true"
                />
            </div>
        </div>
    )
}