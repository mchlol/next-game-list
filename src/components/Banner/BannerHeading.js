import { silkscreen } from "@/fonts"

export default function BannerHeading({children}) {
    return (
        <h2 className={`text-3xl text-center p-4 md:p-8 text-shadow-pink ${silkscreen.className}`}>{children}</h2>
    )
}