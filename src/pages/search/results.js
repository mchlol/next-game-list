import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { handleFetch } from "../api"
import GameCard from "@/components/GameCard";
import { Button } from "react-daisyui";
import PaginateSearch from "@/components/PaginateSearch";
import { FaArrowLeft } from "react-icons/fa6";
import { getParamsString } from "@/functions";

function Search( {data, title, page, totalPages, query, paramsString} ) {

    const router = useRouter();

    console.log('query: ', query);
    console.log('paramsString: ',paramsString)
    
    const [games, setGames] = useState(data.results);
    const currentPage = parseInt(page) || 1;

    const currentParams = {
        ...query,
        page: currentPage
    }

    console.log(currentParams);
    const currentParamsString = getParamsString(currentParams);
    console.log(currentParamsString);

    useEffect( () => {
        const fetchData = async () => {
            const newData = await handleFetch(`https://rawg.io/api/games${currentParamsString}&page_size=24&search_precise=true&token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
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

    // the URL will change based on if certain params are present
    // form a string out of all available params and insert it into the URL
    // page is always 1 
    // so if we have title: 'prey' string is `?search=prey&page=1`
    // get this from context.query so const PARAMS = `?search=${query.title}&page=${query.page}`
    // then URL will be `${BASE_URL}/games${PARAMS}&page_size=${perPage}&search_precise=true&token&key=${API_KEY}`

    const paramsString = getParamsString(query);

    const data = await handleFetch(`${BASE_URL}/games${paramsString}&page_size=${perPage}&search_precise=true&token&key=${API_KEY}`);

    const totalResults = data.count;
    const totalPages = Math.ceil(totalResults / perPage);

    return {
        props: {
            data,
            title,
            page,
            totalPages, // test
            query,
            paramsString
        }
    }
}

export default Search;
