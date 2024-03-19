import { useEffect, useState } from "react";
import { Button, Input, Loading } from "react-daisyui";
import { useRouter } from "next/router";

export default function SearchGames() {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(ev) {
    ev.preventDefault();
    // show the user visual feedback that the next page is loading

    setLoading(true);
    
    router.push( {
      pathname: '/search/results',
      query: {
        searchQuery, 
        page: 1
      },
    })
    
  }

  return (
    <div className="search-form p-4 flex flex-col justify-center align-middle height-minus-nav relative">

      <div className="absolute mx-auto">
        { loading && <Loading color="primary"/>}
      </div>

      <div className="flex flex-col gap-4 bg-base-200 p-4 rounded-lg shadow">

      <h2 className="text-xl md:text-2xl text-shadow-pink">Happy gaming!</h2>

        <form className="join" id="searchForm" onSubmit={handleSubmit}>

          <div className="search-input-wrap">
            <Input bordered
            id="search-input"
            className="join-item md:w-96"
            type="text"
            value={searchQuery}
            placeholder="Search by game title"
            autoComplete="off"
            onChange={ev => setSearchQuery(ev.target.value)} required/>

            <Button type="submit" className="btn btn-primary join-item">Search</Button>
          </div>

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
