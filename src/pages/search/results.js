import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { handleFetch } from "../api"
import GameCard from "@/components/GameCard";
import { Button } from "react-daisyui";
import PaginateSearch from "@/components/PaginateSearch";
import { FaArrowLeft } from "react-icons/fa6";

function Search( {data, title, page, totalPages} ) {

    const router = useRouter();
    
    const [games, setGames] = useState(data.results);
    const [loading, setLoading] = useState(false);
    const currentPage = parseInt(page) || 1;

    useEffect( () => {
        const fetchData = async () => {
            const newData = await handleFetch(`https://rawg.io/api/games?search=${title}&page=${currentPage}&page_size=24&search_precise=true&token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
            setGames(newData.results);
        };
        fetchData();

    },[title, currentPage]);


    return (
        <>
            {
               
                games.length > 0
                ?
                <div className="p-4">
                    <h2 className="text-3xl p-4 text-center">Search Results</h2>
                    <em className="p-4 block text-center">Searching for: <strong>{title}</strong></em>

                    <div className="p-4 grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    grid-cols-1 gap-4">

                        {games.map( item => <GameCard key={item.slug} game={item} />)}

                    </div>

                    {/*  pagination  */}

                    <PaginateSearch title={title} totalPages={totalPages} currentPage={currentPage} />
                    
                    <Button type="button"
                    onClick={ () => router.back()}
                    >
                        <FaArrowLeft /> Back
                    </Button>

                </div>
                : 
                <div>
                    <em className="p-4 text-center block">Showing search results for: <strong>{title}</strong></em>
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
    const title = query.title || '';
    const page = query.page;
    const perPage = 24;

    if (!title) {
        return {
            notFound: true,
        }
    }

    const BASE_URL = 'https://rawg.io/api';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    
    const data = await handleFetch(`${BASE_URL}/games?search=${title}&page=${page}&page_size=${perPage}&search_precise=true&token&key=${API_KEY}`);

    const totalResults = data.count;
    const totalPages = Math.ceil(totalResults / perPage);

    return {
        props: {
            data,
            title,
            page,
            totalPages
        }
    }
}

export default Search;
