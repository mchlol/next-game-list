import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { handleFetch } from "../api"
import GameCard from "@/components/GameCard";
import { Pagination, Button } from "react-daisyui";
import { FaArrowLeft } from "react-icons/fa6";

function Search( {data, searchQuery, page, totalPages} ) {

    const router = useRouter();
    const [games, setGames] = useState(data.results);
    const currentPage = parseInt(page) || 1;

    // console.log(games)

    useEffect( () => {
        const fetchData = async () => {
            const newData = await handleFetch(`https://rawg.io/api/games?search=${searchQuery}&page=${currentPage}&page_size=12&search_precise=true&token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
            setGames(newData.results);
        };
        fetchData();

    },[searchQuery, currentPage]);


    return (
        <>
            {
               
                games.length > 0
                ?
                <div className="search-results-wrap p-4">
                    <h2 className="text-sm"><em className="p-4 block">Searching for: <strong>{searchQuery}</strong></em></h2>

                    <div className="search-results p-4 grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3
                    grid-cols-1 gap-4">

                        {games.map( item => <GameCard key={item.slug} game={item} />)}

                    </div>

                    <div className="p-4 flex justify-center">
                        <Pagination>
                            <Button
                            disabled={currentPage === 1}
                            onClick={ () => router.push( {
                                pathname: '/search/results',
                                query: { searchQuery, page: currentPage - 1}
                            })
                            }
                            className="join-item"
                            >
                                ←
                            </Button>

                            <Button className="join-item">
                                Page {currentPage}
                            </Button>

                            <Button
                            disabled={currentPage === totalPages}
                            className="join-item"
                            onClick={() => router.push( {
                                pathname: '/search/results',
                                query: { searchQuery, page: currentPage + 1}
                            })}
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
    const page = query.page;
    const perPage = 12;

    if (!searchQuery) {
        return {
            notFound: true,
        }
    }

    const BASE_URL = 'https://rawg.io/api';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    
    const data = await handleFetch(`${BASE_URL}/games?search=${searchQuery}&page=${page}&page_size=${perPage}&search_precise=true&token&key=${API_KEY}`);

    const totalResults = data.count;
    const totalPages = Math.ceil(totalResults / perPage);

    return {
        props: {
            data,
            searchQuery,
            page,
            totalPages
        }
    }
}

export default Search;