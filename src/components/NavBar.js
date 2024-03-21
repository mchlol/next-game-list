import { Navbar } from "react-daisyui";
import Link from "next/link";
import { silkscreen } from "@/fonts";

export default function NavBar() {
    
    return (
        <Navbar className={`fixed z-10 p-4 flex justify-between gap-4 ${silkscreen.className} max-w-[1440px]`}
        style={{backdropFilter: "blur(5px)"}}>

            <div className="flex-none pl-4">
                <span className="md:text-xl text-shadow-pink">
                    <Link href="/">GameList</Link>
                </span>
            </div>

            
            <div className="flex-none flex flex-wrap gap-4 md:gap-8 pr-4">

                <Link href="/search" passHref legacyBehavior>
                    Search
                </Link>

                <Link href="/lists" passHref legacyBehavior>
                    Lists
                </Link>

            </div>
        </Navbar>
    )
}