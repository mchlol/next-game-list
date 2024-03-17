import Image from "next/image"
import { createContext } from "react";
const BannerContext = createContext();
export { BannerContext };


export default function Banner({children, imageSrc, altText, imagePosition, Icon}) {

    const imageContainerClasses = `image-blend-screen sm:static absolute top-0 md:min-w-full row-start-1 row-span-2 ${imagePosition === 'right' ? 'col-start-2' : 'col-start-1'}`;

    return (
        <BannerContext.Provider value={ {Icon, imageSrc, altText, imagePosition}} >

            <div className="grid md:grid-cols-2 gap-2 relative sm:static">

                <div className="flex items-center justify-center flex-col md:min-h-96 p-4 mt-8 mb-8">

                    <Banner.Icon 
                    Icon={Icon} 
                    />

                    {children}

                </div>

                {
                    imageSrc
                    ?
                    <div className={imageContainerClasses}>
                        <Image className="min-h-full object-cover" src={imageSrc} alt={altText} />
                    </div>
                    :
                    null
                    
                }
                

            </div>

    </BannerContext.Provider>
    )
}