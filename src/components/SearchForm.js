import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useRouter } from "next/router";

export default function SearchForm() {

    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
  
    function handleSubmit(ev) {
      ev.preventDefault();
      // go to dynamic route /search/[searchQuery]
      if (searchQuery === '') {
        router.push(`/${searchQuery}`)
      } else {
      router.push(`/search/${searchQuery}`);
      }
    }

    return (
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
    )
}