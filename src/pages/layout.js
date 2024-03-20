import NavBar from "@/components/NavBar";
import AppFooter from "@/components/AppFooter";
import { montserrat } from "@/fonts";

export default function Layout( {children} ) {
    return (
        <div className="page-wrap">
            <NavBar />
            <main className={`mt-16 ${montserrat.className}`}>{children}</main>
            <AppFooter />
        </div>
    )
}