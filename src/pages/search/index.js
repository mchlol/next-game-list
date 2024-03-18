import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { useRouter } from "next/router";

export default function SearchGames() {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();

    router.push( {
      pathname: '/search/results',
      query: {
        searchQuery, 
        page: 1
      },
    })
    
  }

  return (
    <div className="search-form p-4 flex flex-col justify-center align-middle height-minus-nav">

      <div className="flex flex-col gap-4">

        <h2 className="text-xl md:text-2xl">Happy gaming!</h2>

        <form className="bg-base-200 p-4 rounded-lg shadow join z-10" id="searchForm" onSubmit={handleSubmit}>
          <Input bordered
          id="search-input"
          type="text"
          value={searchQuery}
          placeholder="Search for a game title"
          autoComplete="off"
          className="join-item md:w-96"
          onChange={ev => setSearchQuery(ev.target.value)} required/>
          <Button type="submit" className="btn btn-secondary join-item">Search</Button>
        </form>

        <small><em>Coming soon: search sort and filter!</em></small>

      </div>

      {/* filter where genre includes 'action' or platform includes 'playstation' */}
      {/* sort by release date or metacritic score */}

      {/* <ul className="p-4 max-w-[75ch]">
        <li>One-Stop Gaming Hub: Access thousands of games across multiple platforms in one centralized location.</li>
        <li>Save for Later: Create your personalized wishlist and keep track of games you're eager to play.</li>
        <li>Never Miss a Beat: Easily save your favorite games for quick access and endless entertainment.</li>
      </ul> */}


    </div>
  )
}
