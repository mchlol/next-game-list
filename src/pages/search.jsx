import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useRouter } from "next/router";

export default function Search() {

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
            
        <form className="join" id="searchForm" onSubmit={handleSubmit}>
            <Input bordered 
            id="search-input"
            type="text" 
            value={searchQuery}
            placeholder="Search for a game title" 
            autoComplete="off"
            className="join-item" 
            onChange={ev => setSearchQuery(ev.target.value)} required/> 
            <Button type="submit" className="btn btn-secondary join-item">Search</Button>
        </form>

        <div className="p-4"></div>
        <h3 className="text-xl">Happy gaming!</h3>

    </div>
  )
}
