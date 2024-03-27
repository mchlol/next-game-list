import { useState } from "react";
import { Button, Input, Loading } from "react-daisyui";
import { useRouter } from "next/router";

export default function SearchGames() {

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
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
      'going-under',
      'a-short-hike'
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

    setLoading(true);

    // optional params - genres, developers, tags (lanuage = "eng")
    // sort - name, released, metacritic.

    let params = {
      title,
      page: 1
    }

    if (genre) {
      params = {
        ...params,
        genre
      }
    }
    
    router.push( {
      pathname: '/search/results',
      query: params,
    })
    
  }

  return (
    <div className="search-form p-4 flex flex-col justify-center align-center text-center img-bg bg-cover mix-blend-lighten relative"
    style={{minHeight: "calc(100vh - 8em)"}}>

      <div className="flex flex-col gap-4 bg-base-200 p-4 md:p-8 lg:w-[80%] mx-auto rounded-lg shadow">

        <h2 className="text-xl md:text-2xl text-shadow-pink">Happy gaming!</h2>

        <form className="flex flex-col gap-2" id="searchForm" onSubmit={handleSubmit}>

          <div className="relative">
            <div className="absolute right-0 left-0 top-0 bottom-0 z-10 h-fit mx-auto">
              { loading && <Loading size="lg" color="primary"/>}
            </div>

            <div>
              <label htmlFor="gameTitle" className="mr-1">Title</label>
              <Input bordered
              className="mr-1"
              id="search-input"
              name="gameTitle"
              type="text"
              value={title}
              placeholder="Hypnospace Outlaw"
              autoComplete="off"
              onChange={ev => setTitle(ev.target.value)} required/>
            </div>

            <div>
              <label htmlFor="gameGenre" className="mr-1">Genre</label>
              <Input bordered
              className="mr-1"
              id="genre-input"
              name="gameGenre"
              type="text"
              value={genre}
              placeholder="Indie"
              autoComplete="off"
              onChange={ev => setGenre(ev.target.value)} />
            </div>

            <Button type="submit" className="btn btn-primary mt-2">Search</Button>
          </div>

        </form>

        <div>
          <Button className="w-fit mx-auto btn btn-secondary sm:btn-sm"
          onClick={() => {
            giveSuggestion()
          }}
          >
            Get a recommendation
          </Button>
        </div>

        <small><em>Coming soon: search sort and filter!</em></small>

      </div>

    </div>
  )
}
