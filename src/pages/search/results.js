import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { handleFetch } from "../api"
import GameCard from "@/components/GameCard";
import { Button } from "react-daisyui";
import PaginateSearch from "@/components/PaginateSearch";
import { FaArrowLeft } from "react-icons/fa6";
import { getParamsString, filterByGenre } from "@/functions";

function Search( {data, title, page, totalPages, query} ) {

    const router = useRouter();

    const [games, setGames] = useState(data.results);

    const currentPage = parseInt(page) || 1;

    const currentParams = {
        ...query,
        page: currentPage
    }

    const currentParamsString = getParamsString(currentParams);

    // ! this runs on first render so data is being refetched on the client
    // ! we need to refresh the page to run getServerSideProps again when the pagination buttons are clicked
    // useEffect( () => {
    //     console.log('use effect fetch data running')
    //     const fetchData = async () => {
    //         const newData = await handleFetch(`https://rawg.io/api/games${currentParamsString}&page_size=24&search_precise=true&token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
    //         setGames(newData.results);
    //     };
    //     fetchData();

    // },[currentPage]);

    useEffect( () => {
        if (query.hasOwnProperty('genre')) {
            const filteredGames = filterByGenre(games, query.genre);
            setGames(filteredGames);
        } else {
            console.log('No genre sent')
        }

    },[])

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

    const paramsString = getParamsString(query);

    const data = await handleFetch(`${BASE_URL}/games${paramsString}&page_size=${perPage}&token&key=${API_KEY}`);

    const totalResults = data.count;
    const totalPages = Math.ceil(totalResults / perPage);

    return {
        props: {
            data,
            title,
            page,
            totalPages, // test
            query,
        }
    }
}

export default Search;
