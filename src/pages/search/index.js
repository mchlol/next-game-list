import { useState } from "react";
import { Button, Input, Loading } from "react-daisyui";
import { useRouter } from "next/router";
import { giveSuggestion } from "@/functions";
import { handleFetch } from "../api";

function SearchGames(props) {

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState(props.results.results);

  console.log(props.results)


  function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);

    // optional params - genres, platforms, developers, tags (where language = "eng")
    // sort options - name, released, metacritic - // ! this should be done on the results page

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

            {/* create a select input with options populated from genre names */}

            <Button type="submit" className="btn btn-primary mt-2">Search</Button>
          </div>

        </form>

        <div>
          <Button className="w-fit mx-auto btn btn-secondary sm:btn-sm"
          onClick={() => {
            setLoading(true)
            const suggestion = giveSuggestion()
            router.push( {
              pathname: '/' + suggestion,
            })
            setTimeout(() => {
              setLoading(false);
            },500)
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

export async function getServerSideProps() {

  const results = await handleFetch(`https://rawg.io/api/genres?key=${process.env.NEXT_PUBLIC_API_KEY}`);

  return {
      props: {
          results,
      }
  }
}


export default SearchGames