import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useRouter } from "next/router";

export default function SearchForm() {

    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
  
    function handleSubmit(ev) {
      ev.preventDefault();
      router.push(`/search/${searchQuery}`);
    }

    function handlePopularClick() {
      setSearchQuery('popular');
      router.push(`/search/${searchQuery}`);
    }

    return (
        <form className="join" id="searchForm" onSubmit={handleSubmit}>
            <Input bordered 
            required
            id="search-input"
            type="text" 
            value={searchQuery}
            placeholder="Search for a game title" 
            autoComplete="off"
            className="join-item" 
            onChange={ev => setSearchQuery(ev.target.value)} 
            /> 
            <Button type="submit" className="btn btn-secondary join-item">Search</Button>
            <Button type="button" className="btn btn-primary join-item"
            onClick={handlePopularClick}
            >Popular</Button>
        </form>
    )
}