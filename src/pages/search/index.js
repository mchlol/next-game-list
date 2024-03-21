import { useState } from "react";
import { Button, Input, Loading } from "react-daisyui";
import { useRouter } from "next/router";

export default function SearchGames() {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  function giveSuggestion() {
    const suggestions = [
      'red-dead-redemption',
      'red-dead-redemption-2',
      'cyberpunk-2077',
      'control',
      'deathloop-2',
      'hypnospace-outlaw',
      'lemmings',
      'la-noire',
      'bioshock',
      'unpacking-2',
      'superliminal',
      'moving-out-2',
      'going-under'
    ]
  
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const game = suggestions[randomIndex];
    setLoading(true);
    router.push( {
      pathname: '/' + game,
    })
  }

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
    <div className="search-form p-4 flex flex-col justify-center align-center text-center img-bg bg-cover mix-blend-lighten relative"
    style={{minHeight: "calc(100vh - 8em)"}}>

      <div className="absolute mx-auto z-10">
        { loading && <Loading size="lg"/>}
      </div>

      <div className="flex flex-col gap-4 bg-base-200 p-4 rounded-lg shadow">

      <h2 className="text-xl md:text-2xl text-shadow-pink">Happy gaming!</h2>

        <form className="join block" id="searchForm" onSubmit={handleSubmit}>

          <div>
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

        <div>
          <Button className="w-fit mx-auto btn btn-secondary md:btn-sm"
          onClick={() => {
            giveSuggestion()
          }}
          >
            Get a recommendation
          </Button>
        </div>

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
