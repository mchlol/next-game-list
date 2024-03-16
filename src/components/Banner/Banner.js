
import { createContext } from "react";
const BannerContext = createContext();
export { BannerContext };

export default function Banner({children, imageSrc, altText, Icon}) {

    return (
        <BannerContext.Provider value={ {Icon, imageSrc, altText}} >

        <div className="grid md:grid-cols-2 gap-2">

            <div className="p-4 flex items-center justify-center flex-col">

                <Banner.Icon 
                Icon={Icon} 
                />

                {children}

            </div>

        </div>

    </BannerContext.Provider>
    )
}