import { isValidElement, cloneElement } from "react";

export default function BannerIcon( {children, className, role, ariaHidden} ) {

    // render nothing if children is not a valid react element
    if (!isValidElement(children)) {
        return null;
    }

    // clone the icon component and apply the props
    const iconWithProps = cloneElement(children, {
        className: `text-4xl ${className || ''}`,
        role: role || 'img',
        "aria-hidden": ariaHidden !== undefined ? ariaHidden : true,
    })

    return (
        <div className="motion-safe:animate-float flex justify-center opacity-50">
            {iconWithProps}
          </div>
    )
}