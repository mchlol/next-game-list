import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();

    router.push( {
      pathname: '/search',
      query: {searchQuery, page: 1},

    })
    
  }
  



  return (
    <div className="search-form p-4 flex flex-col justify-center align-middle">
      
      <div className="p-2">
                <h2 className="text-l">For cross-platform gamers!</h2>
                <p>Save games from any and all platforms, even indie games on Steam and Itch.io.</p>
                <br />
                <p>Search an extensive list and create the endless backlog of your dreams!</p>
                <br />
            </div>
            
            <form className="join" id="searchForm" onSubmit={handleSubmit}>
                <Input bordered 
                id="search-input"
                type="text" 
                value={searchQuery}
                placeholder="Search for a game title" 
                autoComplete="off"
                className="join-item" 
                onChange={ev => setSearchQuery(ev.target.value)} /> 
                <Button type="submit" className="btn btn-secondary join-item">Search</Button>
            </form>

            <div className="p-4"></div>
            <h3 className="text-xl">Happy gaming!</h3>

    </div>
  )
}
