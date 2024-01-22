import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import handleFetch from "../api"
import GameCard from "@/components/GameCard";
import { Loading, Pagination, Button } from "react-daisyui";
import { FaArrowLeft } from "react-icons/fa6";

function Search( {data, searchQuery} ) {
    const router = useRouter();
    console.log('data: ',data);
    const [games, setGames] = useState(data.results);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setLoading(true);
        setGames(data.results);
        setLoading(false);
    },[page]);

    return (
        <>
            {
                loading
                ? <div className="p-4 text-center">
                    <Loading />
                </div>
                : games.length > 0
                ?
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
                : 
                <div className="search-results-wrap">
                    <em className="p-4 text-center block">Showing search results for: <strong>{searchQuery}</strong></em>
                    <p className="p-4 text-center block">No results found!</p>

                    <div className="text-center">
                    <Button type="button"
                    onClick={ () => router.back()}
                    >
                        <FaArrowLeft /> Back
                    </Button>
                    </div>
                    
                </div>


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
            data,
            searchQuery
        }
    }
}

export default Search;