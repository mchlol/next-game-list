import Link from "next/link"

export default function NotFound() {
    return (
        <div className="p-4 text-center">
            <h1>Page not found</h1>
            <Link href="/">
                Go to the homepage
            </Link>
        </div>
    )
}