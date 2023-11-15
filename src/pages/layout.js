import NavBar from "@/components/NavBar";
import AppFooter from "@/components/AppFooter";

export default function Layout( {children} ) {
    return (
        <div className="page-wrap">
            <NavBar />
            <main>{children}</main>
            <AppFooter />
        </div>
    )
}