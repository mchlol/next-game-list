import NavBar from "@/components/NavBar";
import AppFooter from "@/components/AppFooter";

export default function Layout( {children} ) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <AppFooter />
        </>
    )
}