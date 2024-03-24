import NavBar from "@/components/NavBar";
import AppFooter from "@/components/AppFooter";
import { montserrat } from "@/fonts";

export default function Layout( {children} ) {
    return (
        <div className="page-wrap min-h-screen relative flex flex-col justify-between max-w-[1440px] mx-auto grad-bg bg-cover bg-no-repeat">
            <NavBar />
            <main 
            className={`mt-16 ${montserrat.className}`}
            style={{minHeight: "calc(100vh - 8rem"}}
            >
                {children}
            </main>
            <AppFooter />
        </div>
    )
}