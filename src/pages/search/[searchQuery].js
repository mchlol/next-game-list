import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import axios from "axios";
import GameCard from "@/components/GameCard";
import { Loading, Pagination, Button } from "react-daisyui";
import { FaArrowLeft } from "react-icons/fa6";

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

        const BASE_URL = 'https://rawg.io/api';
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

        axios.get(`${BASE_URL}/games?search=${searchQuery}&page=${page}&page_size=&search_precise=true&token&key=${API_KEY}`)
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
        <>
            
            {
                loading
                ? <div className="p-4 text-center">
                    <Loading />
                </div>
                : 
                <div className="search-results-wrap">
                    <em className="p-4 text-center block">Showing search results for: <strong>{searchQuery}</strong></em>

                    <div className="search-results p-4 grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">

                        {games.map( item => <GameCard key={item.slug} game={item} />)}

                    </div>

                    <div className="p-4 flex justify-center">
                        <Pagination>
                            <Button
                            disabled={page === 1}
                            onClick={ () => setPage(
                                (prevState) => prevState - 1
                                )}
                            className="join-item"
                            >
                                ←
                            </Button>

                            <Button className="join-item">
                                Page {page}
                            </Button>

                            <Button
                            className="join-item"
                            onClick={ () => setPage(
                                (prevState) => prevState + 1
                                )}
                            >
                                →
                            </Button>

                            
                        </Pagination>
                    </div>
                    
                    <Button type="button"
                    onClick={ () => router.back()}
                    >
                        <FaArrowLeft /> Back
                    </Button>

                </div>


            }

        </>
    )
}