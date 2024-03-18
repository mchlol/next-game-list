import { Navbar, Button, Dropdown } from "react-daisyui";
import Link from "next/link";
import { silkscreen } from "@/fonts";
import { IoIosArrowDown } from "react-icons/io";

export default function NavBar() {
    
    return (
        <Navbar className={`p-4 flex justify-between flex-wrap gap-2 bg-base-200 ${silkscreen.className}`}>

            <div className="flex-none">
                <span className="app-heading md:text-xl">
                    <Link href="/">GameList</Link>
                </span>
            </div>

            
            <div className="flex-none">
                <Link href="/search" passHref legacyBehavior>
                    Search
                </Link>

                <Dropdown className="dropdown-end">

                    <Dropdown.Toggle>
                        Lists <IoIosArrowDown />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="mt-2 z-10">
                        <div className="flex flex-col gap-2 p-2">
                            <Link href="/lists#wishlist" passHref legacyBehavior scroll={false} className="block">
                                Wishlist
                            </Link>
                            <Link href="/lists#favourites" passHref legacyBehavior scroll={false} className="block">
                                Favourites
                            </Link>
                        </div>

                    </Dropdown.Menu>

                </Dropdown>

            </div>
        </Navbar>
    )
}