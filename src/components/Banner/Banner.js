import Image from "next/image"
import { createContext } from "react";
const BannerContext = createContext();
export { BannerContext };


export default function Banner({children, imageSrc, altText, imagePosition, Icon}) {

    const imageStyle = {
        maskImage: 'linear-gradient(rgb(0 0 0 / 100%), transparent)'
      }

    
    return (
        <BannerContext.Provider value={ {Icon, imageSrc, altText, imagePosition}} >

            <div className="relative sm:static flex">

                <div className="flex-1 flex items-center justify-center flex-col h-[32rem] p-4 mt-8 mb-8">

                    <Banner.Icon 
                    Icon={Icon} 
                    />

                    {children}

                </div>

                {
                    imageSrc
                    ?
                    <div className={`flex-1 mix-blend-screen aspect-video sm:static absolute top-0 ${imagePosition === 'left' ? 'order-first' : 'order-last'}`}
                    >
                        <Image className="min-h-full object-cover" src={imageSrc} alt={altText}
                        style={imageStyle}
                        />
                    </div>
                    :
                    null
                    
                }
                

            </div>

    </BannerContext.Provider>
    )
}