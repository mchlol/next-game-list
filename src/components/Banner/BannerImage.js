import Image from "next/image"

export default function BannerImage({imageSrc, altText}) {

    return (
        <div className="image-blend-screen">
            <Image src={imageSrc} alt={altText} />
        </div>
    )
}