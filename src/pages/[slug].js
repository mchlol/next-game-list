import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-daisyui';
import { formatDate, joinArray, joinPlatformArray } from '@/functions';
import Screenshots from '@/components/Screenshots';
import { FaGift, FaCheck, FaHeart, FaArrowLeft } from 'react-icons/fa6';
import { handleFetch } from './api';
import DOMPurify from 'isomorphic-dompurify';


export default function ViewGame( props ) {
    
    const router = useRouter();

    const [gameData, setGameData] = useState(props.gameData);
    const [screenshots, setScreenshots] = useState(props.screenshots);
    const [gameInWishlist, setGameInWishlist] = useState(false);
    const [gameInFavourites, setGameInFavourites] = useState(false);

    const cleanDescriptionHTML = DOMPurify.sanitize(gameData.description, { USE_PROFILES: { html: true } });


    function handleClick(ev, listName, gameObj) {

        let storedList = JSON.parse(localStorage.getItem(listName));
        let gameIsInList = false;

        if (!storedList || storedList.length === 0) {
            storedList = [];
        } else {
            gameIsInList = isGameInList(gameObj, listName);
        }

        if (!gameIsInList) {
            storedList.push(gameObj);
        } 
        buttonStyle(true, ev.target,listName);

        localStorage.setItem(listName,JSON.stringify(storedList));
    }

    function isGameInList(gameObj, listName) {
        if (typeof window !== 'undefined') {
            let storedList = JSON.parse(localStorage.getItem(listName));
            if (storedList) {
                const indexInList = storedList.findIndex(obj => obj.id === gameObj.id);
                return indexInList >= 0
            } 
        }
    }
    
    function buttonStyle(inList, button, listName) {
        if (inList) {
            button.className = 'm-1 btn btn-wide btn-success';
            button.textContent = `Added to ${listName}!`;
        } else {
            button.className = 'm-1 btn btn-wide btn-secondary';
        }
    }
    
    useEffect( () => {
        setGameInWishlist(isGameInList(gameData, 'wishlist'));
        setGameInFavourites(isGameInList(gameData, 'favourites'));
    },[])
    
    // disable redirect as props don't get passed
    if (gameData.detail === "Not found." || gameData.redirect) {
        return (
            <div className="text-center flex flex-col justify-center gap-4"
            style={{minHeight: "calc(100vh - 8rem"}}>
                <h2 className="text-2xl">Error loading game data.</h2>
                <p>Sorry about that!</p>
                
                <Link href="/"><Button>Home</Button></Link>
            </div>
        )
    }

    return (
        <div>
                
            <div className="lg:mt-12 text-center">

                { 
                    gameData.background_image
                    ?
                    <figure className="m-8 mx-auto w-[80%] h-auto aspect-video relative" style={{maxHeight: "500px"}}>
                        <Image 
                        src={gameData.background_image} 
                        alt={gameData.name} 
                        className="object-cover rounded-box shadow-2xl"
                        fill
                        placeholder="blur"
                        blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPc5rarHgAFpwI33DccBAAAAABJRU5ErkJggg=='}
                        /> 
                    </figure>
                    :
                    null
                }
                
                <div className="m-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-shadow-pink break-words">{gameData.name}</h1>
                </div>

                <div className="flex flex-col relative">

                    <section className="grad-bg-pink">
                        <div className="p-2 mt-8 mx-auto max-w-[80%] lg:grid lg:grid-cols-2 lg:grid-rows-2 bg-secondary/70 rounded-box">

                            <div className="row-start-1 row-end-3 sm:mx-auto md:max-w-[50ch] m-4 p-4 lg:p-8 rounded-box lg:justify-self-end">
                                <h2 className="text-2xl">Details</h2>
                                <p>
                                    <strong>Released:</strong>  <span>{formatDate(gameData.released)}</span>
                                </p>
                                <p>
                                    <strong>Developers:</strong>  <span>{joinArray(gameData.developers)}</span>
                                </p>
                                <p>
                                    <strong>Platforms:</strong>  <span>{joinPlatformArray(gameData.parent_platforms)}</span>
                                </p>
                                <p>
                                    <strong>Genres:</strong>  <span>{joinArray(gameData.genres)}</span>
                                </p>
                                <p>
                                    <strong>Metacritic rating:</strong> {gameData.metacritic ? <span className="badge badge-accent font-bold"> {gameData.metacritic}</span> : <span>N/A</span> }
                                </p>
                                <p>
                                    <strong>ESRB rating:</strong> {gameData.esrb_rating ? <span>{gameData.esrb_rating.name}</span> : <span>N/A</span>}
                                </p>
                            </div>

                            <div className="row-start-1 row-end-2 pt-4 flex flex-col justify-center items-center gap-3">

                                <Button
                                className={`m-1 btn sm:btn-wide ${gameInWishlist && 'btn-success'}`}
                                disabled={gameInWishlist}
                                onClick={(ev) => {
                                    handleClick(ev,'wishlist',gameData)
                                }}
                                >
                                    {
                                        gameInWishlist
                                        ?
                                        <>
                                            <FaCheck /> In wishlist
                                        </>
                                        :
                                        <>
                                            <FaGift /> Add to wishlist
                                        </>
                                    }
                                    
                                </Button>

                                <Button
                                className={`m-1 btn sm:btn-wide ${gameInFavourites && 'btn-success'}`}
                                disabled={gameInFavourites}
                                onClick={ev => handleClick(ev, 'favourites', gameData)}
                                >
                                        
                                    {
                                        gameInFavourites
                                        ? 
                                        <>
                                            <FaCheck /> In Favourites
                                        </>
                                        : 
                                        <>
                                            <FaHeart /> Add to favourites
                                        </>
                                        
                                        }
                                </Button>

                            </div>

                            <div className="row-start 2 row-end-3 mt-4 p-4 flex flex-col gap-2 justify-center items-center">
                                <h2 className="text-2xl text-center">Links</h2>
                                {/* // ! this could be its own component */}
                                <ul className="text-center">
                                    <li>
                                        <Link href={`https://rawg.io/games/${gameData.slug}`} target="_blank"
                                        rel="noopener noferrer"
                                        className="text-[#df9eff]">
                                            View this game on RAWG.io
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`https://rawg.io/games/${gameData.slug}/suggestions`} target="_blank" rel="noopener noreferrer"
                                        className="text-[#df9eff]">
                                            View similar games on RAWG.io
                                        </Link>
                                    </li>
                                    {
                                        gameData.website 
                                        &&
                                        <li>
                                            <Link href={gameData.website} target="_blank" rel="noopener noreferrer"
                                            className="text-[#df9eff]">
                                                Go to game website
                                            </Link>
                                        </li>
                                        
                                    }
                                </ul>
                    
                            </div>
                        </div>
                    </section>
                    
                    <section className="border-transparent m-8 max-w-[80%] mx-auto">
                        <h2 className='m-4 text-2xl'>Description</h2>

                        {
                        // check if the description contains p or br tags 
                        gameData.hasOwnProperty('description')
                        ?
                            gameData.description.includes('<p>') || gameData.description.includes('<br/>')
                            ? <div
                            className="text-justify break-words"
                            dangerouslySetInnerHTML={
                                { __html: cleanDescriptionHTML }
                            }
                            ></div>
                            : <p className="text-justify break-words">{gameData.description}</p>
                        : <p className="text-justify">No description is available for this game.</p>
                        }
                    
                    </section>
                </div>

                {/* screenshots */}
                <section className="mt-4 mb-4">
                    <h2 className="mb-4 text-2xl">Screenshots</h2>
                    <Screenshots data={screenshots}/>
                </section>

                <Button className="m-4" type="button"
                onClick={ () => router.back()}
                >
                    <FaArrowLeft /> Back
                </Button>

            </div>
            
        </div>
    )
    
}


export async function getServerSideProps( {params}) {

    const gameData = await handleFetch(`https://rawg.io/api/games/${params.slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`);
    const screenshots = await handleFetch(`https://rawg.io/api/games/${params.slug}/screenshots?key=${process.env.NEXT_PUBLIC_API_KEY}`)

    return {
        props: {
            gameData,
            screenshots,
            slug: params.slug
        }
    }
}

