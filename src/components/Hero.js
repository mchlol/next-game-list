import { Button } from "react-daisyui";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="home-hero p-2 flex flex-col items-center justify-center h-96 w-full">
        <h1 className="lg:text-9xl text-6xl break-all text-center">GameList</h1>
        <h2 className="text-xl text-center">Create the endless backlog of your dreams!</h2>
          <Button className="mt-4">
            <Link href="/search">
              Search now!
            </Link>
          </Button>
      </div>
    )
}