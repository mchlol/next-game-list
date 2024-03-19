import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button } from 'react-daisyui';
import { formatDate, joinArray, joinPlatformArray } from '@/functions';
import Screenshots from '@/components/Screenshots';
import { FaGift, FaHeartCirclePlus, FaHeartCircleCheck, FaArrowLeft } from 'react-icons/fa6';
import { handleFetch } from './api';
import DOMPurify from 'isomorphic-dompurify';

// ! because rendering is done on the server there is a pause before routing?

export default function ViewGame( {results} ) {
    const router = useRouter();

    const [gameData, setGameData] = useState(results);
    const cleanDecriptionHTML = DOMPurify.sanitize(gameData.description, { USE_PROFILES: { html: true } });

    //! need some state for the buttons
    //! consider moving the display logic to its own component

    function handleClick(ev, listName, gameObj) {

        // copy the list from storage
        let storedList = JSON.parse(localStorage.getItem(listName));
        let gameIsInList = false; // initialise a boolean

        // if the list doesnt exist yet, create it
        if (!storedList || storedList.length === 0) {
            storedList = []; // make sure it's an array
        } else {
            // list does exist, if game is in there get the index
            const indexInList = storedList.findIndex( obj => obj.id === gameObj.id);
            // set the boolean to true
            indexInList === -1 ? gameIsInList = false : gameIsInList = true;
        }

        // if the boolean is false, add the game to the list
        if (!gameIsInList) {
            storedList.push(gameObj);
        } 
        // give the user feedback for their action
        buttonStyle(true, ev.target,listName);

        // update local storage
        localStorage.setItem(listName,JSON.stringify(storedList));
    }

    function buttonStyle(inList, button, listName) {
        if (inList) {
            button.className = 'm-1 btn btn-wide btn-success';
            button.textContent = `In ${listName}!`;
        } else {
            button.className = 'm-1 btn btn-wide btn-secondary';
        }
    }

    // disable redirect as props don't get passed
    if (gameData.detail === "Not found." || gameData.redirect) {
        return (
            <div className="text-center flex flex-col gap-4">
                <h2>Error loading game data.</h2>
                <p>Sorry about that!</p>
                
                <Link href="/"><Button>Home</Button></Link>
            </div>
        )
    }

    return (
        <div>
            
                
                {/* // ? loading handling was here */}
                
                <div className="lg:mt-12 text-center">

                    <figure className="m-8">
                        { 
                            gameData.background_image
                            ?
                            <img 
                            src={gameData.background_image} 
                            alt={gameData.name} 
                            className="view-game-img rounded-box shadow-2xl"
                            /> 
                            :
                            null
                        }
                    </figure>

                    <div className="slug-header m-8">
                        <h1 className="view-title lg:text-6xl">{gameData.name}</h1>
                    </div>

                    <div className="md:grid md:grid-cols-1 md:grid-rows-2">
                        <section className="slug-info-wrap md:row-start-1 md:row-end-2">
                            <div className="p-2 mt-8 mx-auto max-w-[80%] lg:grid lg:grid-cols-2 lg:grid-rows-2">
                                <div className="slug-details row-start-1 row-end-3 sm:mx-auto md:max-w-[50ch] p-2 lg:p-8 rounded-box lg:justify-self-end">
                                    <h2>Details</h2>
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
                                <div className="slug-btns row-start-1 row-end-2 m-4 flex flex-col pt-4 gap-3 justify-center items-center">
                                    <Button
                                    className="m-1 btn btn-wide"
                                    onClick={(ev) => {
                                        handleClick(ev,'wishlist',gameData)
                                    }}
                                    >
                                        <FaGift /> Add to wishlist
                                    </Button>
                                    <Button
                                    className="m-1 btn btn-wide"
                                    onClick={ev => handleClick(ev, 'favourites', gameData)}
                                    >
                                        <FaHeartCirclePlus /> Add to favourites
                                    </Button>
                                </div>
                                <div className="slug-links row-start 2 row-end-3 m-4">
                                    <h2 className="text-center">Links</h2>
                                    {/* // ! this could be its own component */}
                                    <ul className="text-center">
                                        <li>
                                            <Link href={`https://rawg.io/games/${gameData.slug}`} target="_blank">
                                                View this game on RAWG.io
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`https://rawg.io/games/${gameData.slug}/suggestions`} target="_blank" rel="noreferrer">
                                                View similar games on RAWG.io
                                            </Link>
                                        </li>
                                    </ul>
                        
                                </div>
                            </div>
                        </section>
                        <section className="slug-description p-4 md:row-start-2 md:row-end-3 border-transparent">
                            <h2 className='mb-4'>Description</h2>
                        
                            {
                            gameData.hasOwnProperty('description')
                            ?
                                gameData.description.includes('<p>')
                                ? <div
                                className="game-description text-justify"
                                dangerouslySetInnerHTML={
                                    { __html: cleanDecriptionHTML }
                                }
                                ></div>
                                : <p className="game-description text-justify">{gameData.description}</p>
                            : <p className="game-description text-justify">No description is available for this game.</p>
                            }
                        
                        </section>
                    </div>


                    <section className="mt-4 mb-4">
                        <h2 className="mb-4">Screenshots</h2>
                        <Screenshots slug={gameData.slug} />
                    </section>

                    {/* // ! this should be its own component  */}
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

    const URL = `https://rawg.io/api/games/${params.slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const results = await handleFetch(URL);
    console.log(params.slug)

    return {
        props: {
            results,
            slug: params.slug
        }
    }
}

