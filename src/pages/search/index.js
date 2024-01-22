// import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import handleFetch from "../api"

function Search( {data} ) {
    // const router = useRouter();

    const [games, setGames] = useState(data.results);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setLoading(true);
        setGames(data.results);
        setLoading(false);
    },[]);

    const elements = games.map(game => <li key={game.id}>{game.name}</li>)

    return (
        <>
            <h1>Search Results</h1>

            {
                loading
                ? 
                <p>Loading...</p>
                : 
                <ul>
                    {games.map(game => <li key={game.id}>{game.name}</li>)}
                </ul>
            }
        </>
    )
}

export async function getServerSideProps(context) {

    const { query } = context;
    const searchQuery = query.searchQuery || '';

    console.log('searchQuery: ',searchQuery)

    if (!searchQuery) {
        return {
            notFound: true,
        }
    }

    const BASE_URL = 'https://rawg.io/api';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    
    const data = await handleFetch(`${BASE_URL}/games?search=${searchQuery}&page=1&page_size=18&search_precise=true&token&key=${API_KEY}`);
    return {
        props: {
            data
        }
    }
}

export default Search;