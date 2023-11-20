import SearchForm from "@/components/SearchForm";


export default function Home() {

  return (
    <div className="search-form p-4 flex flex-col justify-center align-middle">
      
      <div className="p-2">
                <h2 className="text-l">For cross-platform gamers!</h2>
                <p>Save games from any and all platforms, even indie games on Steam and Itch.io.</p>
                <br />
                <p>Search an extensive list and create the endless backlog of your dreams!</p>
                <br />
            </div>
            
            <SearchForm />

            <div className="p-4"></div>
            <h3 className="text-xl">Happy gaming!</h3>

    </div>
  )
}
