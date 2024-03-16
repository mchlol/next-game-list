import { isValidElement, cloneElement } from "react";

export default function BannerIcon( {children, className, role, ariaHidden} ) {

    // render nothing if children is not a valid react element
    if (!isValidElement(children)) {
        return null;
    }

    // clone the icon component and apply the props
    const iconWithProps = cloneElement(children, {
        className: `text-6xl ${className || ''}`,
        role: role || 'img',
        "aria-hidden": ariaHidden !== undefined ? ariaHidden : true,
    })

    return (
        <div className="icon-1">
            {iconWithProps}
          </div>
    )
}