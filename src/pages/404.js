import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "react-daisyui";
import { FaArrowLeft, FaHouse } from "react-icons/fa6";


export default function NotFound() {
    return (
        <div className="p-4 text-center">

            <h1>Page not found</h1>
            <p>One of us done goofed!</p>

            <div className="p-4 flex justify-center gap-4">

                <Button type="button"
                onClick={ () => router.back()}
                >
                    <FaArrowLeft /> Back
                </Button>

                <Button type="button"
                onClick={() => router.push("/")}
                >
                    <FaHouse /> Home
                </Button>
            </div>
        </div>
    )
}