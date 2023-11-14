import { Navbar, Button } from "react-daisyui";

export default function NavBar() {


    
    return (
        <Navbar className="app-nav p-4 flex justify-between flex-wrap bg-base-100">
            <div className="flex-none">
                <h1 className="app-heading">
                    GameList
                </h1>
            </div>

            
            <div>
                <Button tag="a" className="btn btn-secondary mr-2">
                    Search
                </Button>
                <Button tag="a" className="btn btn-primary">
                    My Lists
                </Button>
            </div>
        </Navbar>
    )
}