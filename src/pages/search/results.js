import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { handleFetch } from "../api"
import GameCard from "@/components/GameCard";
import { Pagination, Button, Loading } from "react-daisyui";
import { FaArrowLeft } from "react-icons/fa6";

function Search( {data, searchQuery, page, totalPages} ) {

    const router = useRouter();
    
    const [games, setGames] = useState(data.results);
    const [loading, setLoading] = useState(false);
    const currentPage = parseInt(page) || 1;

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
                <div className="p-4">
                    <h2 className="text-3xl p-4 text-center">Search Results</h2>
                    <em className="p-4 block text-center">Searching for: <strong>{searchQuery}</strong></em>

                    <div className="p-4 grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3
                    grid-cols-1 gap-4">

                        {games.map( item => <GameCard key={item.slug} game={item} />)}

                    </div>

                    <div className="p-4 flex justify-center relative">
                    {
                        loading && <Loading color="primary" className="absolute"/>
                    }
                        <Pagination>

                            // * previous page
                            <Button
                            color="primary"
                            disabled={currentPage === 1}
                            onClick={ () => {
                                setLoading(true);
                                router.push( {
                                pathname: '/search/results',
                                query: { searchQuery, page: currentPage - 1}
                            });
                            setTimeout( () => setLoading(false), 500)
                            
                            }
                            }
                            className="join-item"
                            >
                                ←
                            </Button>

                            // * previous page
                            <Button
                            color="primary"
                            className="join-item"
                            disabled={currentPage === 1}
                            onClick={() => {
                                setLoading(true);
                                router.push( {
                                pathname: '/search/results',
                                query: { searchQuery, page: 2}
                            });
                            setTimeout( () => setLoading(false), 500)
                            }
                            }
                            >
                                1
                            </Button>
                            
                            // * current page
                            <Button color="secondary" className="join-item">
                                Page {currentPage}
                            </Button>
                            
                            // * last page
                            <Button
                            color="primary"
                            className="join-item"
                            disabled={currentPage === totalPages}
                            onClick={() => {
                                setLoading(true);
                                router.push( {
                                pathname: '/search/results',
                                query: { searchQuery, page: totalPages}
                            });
                            setTimeout( () => setLoading(false), 500)
                            }
                            }
                            >
                                {totalPages}
                            </Button>
                            
                            // * next page
                            <Button
                            color="primary"
                            disabled={currentPage === totalPages}
                            className="join-item"
                            onClick={() => {
                                setLoading(true);
                                router.push( {
                                pathname: '/search/results',
                                query: { searchQuery, page: currentPage + 1}
                            });
                            setTimeout( () => setLoading(false), 500)
                            }
                            }
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
                <div>
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