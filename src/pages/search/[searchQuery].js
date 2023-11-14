import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import axios from "axios";
import GameCard from "@/components/GameCard";
import { Loading } from "react-daisyui";

export default function Query() {
    const router = useRouter();
    const searchQuery = router.query.searchQuery;
    console.log('[searchQuery]: ',searchQuery);

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    useEffect( () => {

        setLoading(true);

        axios.get(`https://rawg.io/api/games?search=${searchQuery}&page=${page}&page_size=&token&key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then( res => {
            setGames(res.data.results);
            console.log(res.data.results);
            setLoading(false);
        })
        .catch( err => {
            console.log('Error: ',error);
            setError(err);
            setLoading(false);
        })

    },[page]);

    if (error) {
        return <p>Could not load search results.</p>
    }

    return (
        <div className="search-results flex flex-wrap gap-4">
            {
                loading
                ? <Loading />
                : 
                games.map( item => <GameCard game={item} />)
            }
        </div>
    )
}