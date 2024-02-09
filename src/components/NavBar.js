import { Navbar, Button, Dropdown } from "react-daisyui";
import Link from "next/link";

export default function NavBar() {


    
    return (
        <Navbar className="app-nav p-4 flex sm:justify-between flex-wrap gap-2 justify-center bg-base-200">
            <div className="flex-none">
                <h1 className="app-heading">
                    <Link href="/">GameList</Link>
                </h1>
            </div>

            
            <div>
                <Link href="/" passHref legacyBehavior>
                    <Button tag="a" className="btn btn-secondary mr-2">
                        Search
                    </Button>
                </Link>

                <Dropdown className="dropdown-end">

                    <Dropdown.Toggle>
                        <span className="btn btn-primary">Lists</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="list-links">
                            <Link href="/lists#wishlist" passHref legacyBehavior scroll={false}>
                                <span className="btn">Wishlist</span>
                            </Link>
                            <Link href="/lists#favourites" passHref legacyBehavior scroll={false}>
                                <span className="btn">Favourites</span>
                            </Link>
                        </div>

                    </Dropdown.Menu>

                </Dropdown>
                
                {/* <Link href="/lists" passHref legacyBehavior>
                    <Button tag="a" className="btn btn-primary">
                        My Lists
                    </Button>
                </Link> */}
            </div>
        </Navbar>
    )
}