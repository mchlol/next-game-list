import { Footer } from "react-daisyui";

export default function AppFooter() {
    return (
        <Footer className="app-footer p-4 bg-primary text-secondary-content flex place-content-center">
            <div className="flex justify-center">
                All data provided by <a href="https://rawg.io" rel="noreferrer" target="_blank">RAWG.io</a>
            </div>
        </Footer>
    )
}