import Link from "next/link"

export default function NotFound() {
    return (
        <div className="p-4 text-center">
            <h1>Page not found</h1>
            <p>One of us done goofed!</p>
            <br />
            <Link href="/">
                Home
            </Link>
        </div>
    )
}