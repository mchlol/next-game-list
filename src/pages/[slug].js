import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button } from 'react-daisyui';
import { formatDate, joinArray, joinPlatformArray } from '@/functions';
import Screenshots from '@/components/Screenshots';
import { FaGift, FaHeartCirclePlus, FaHeartCircleCheck, FaArrowLeft } from 'react-icons/fa6';
import handleFetch from './api';

// ! because rendering is done on the server there is a pause before routing?

export default function ViewGame( {results, slug} ) {
    const router = useRouter();

    const [gameData, setGameData] = useState(results);
    

    //! may need some state for the buttons
    //! consider moving the display logic to its own component


    // list buttons handler
    // ! move to lib

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
                
                <div className="m-4">

                    <div className="m-4">
                        <h2 className="view-title">{gameData.name}</h2>
                    </div>

                    <div className="m-4 bg-black rounded-box">
                        { 
                        // ! consider setting the container and image to the same aspect ratio to avoid letterboxing
                            <img 
                            src={gameData.background_image} 
                            alt={gameData.name} 
                            className="view-game-img rounded-box"
                            /> 
                        }
                    </div>

                    <Card className="m-4 p-4 rounded-box">
                        
                        <div className="game-details mx-auto">
                            <h3>Details</h3>

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
                                <strong>Metacritic rating:</strong> {gameData.metacritic ? <span className="badge badge-accent"> {gameData.metacritic}</span> : <span>N/A</span> }
                            </p>
                            <p>
                                <strong>ESRB rating:</strong> {gameData.esrb_rating ? <span>{gameData.esrb_rating.name}</span> : <span>N/A</span>}
                            </p>
                        </div>
                    </Card>

                    <div className="m-4 text-center">
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

                    <Card className="game-description-wrap m-4 p-4 rounded-box" suppressHydrationWarning>
                        <h3 className='game-description'>Description</h3>
                        
                        {
                        gameData.hasOwnProperty('description')
                        ?
                            gameData.description.includes('<p>')
                            ? <div 
                            className="game-description text-justify"
                            dangerouslySetInnerHTML={
                                { __html: gameData.description }
                            }
                            ></div>
                            : <p className="game-description text-justify">{gameData.description}</p>
                        : <p className="game-description text-justify">Not provided</p>
                        }
                        
                    </Card>

                    <div className="m-4">
                        <h3>Screenshots</h3>
                        <Screenshots slug={gameData.slug} />
                    </div>

                    <div className="m-4 mx-auto w-fit">
                        <h3 className="text-center">Links</h3>
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

