import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Loading, Card, Button } from 'react-daisyui';
import { formatDate, joinArray, joinPlatformArray } from '@/functions';
import Screenshots from '@/components/Screenshots';
import { FaGift, FaHeartCirclePlus, FaHeartCircleCheck, FaArrowLeft } from 'react-icons/fa6';

export default function ViewGame() {
    const router = useRouter();

    const [slug, setSlug] = useState(router.query.slug);
    const [gameData, setGameData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect( () => {

        loadGameDetails(slug);

    },[slug]);

    function loadGameDetails(slug) {
        setLoading(true);
        
        axios.get(`https://rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then( res => {
            setGameData(res.data);
            setLoading(false);
        })
        .catch( err => {
            console.log('Error: ',error);
            setError(err);
            setLoading(false);
        })
    }

    // handle click
    // write a function to check if the list exists in storage
    // if so check if game is in list & return a boolean
    // use boolean to toggle add to or remove game from list
    // use boolean to display button accordingly

    function handleClick(ev, listName, gameObj) {
        // ? consider only copying the useful keys: background_image, developers, esrb_rating, genres, id, metacritic, name, parent_platforms, playtime, released, slug, tags

        // copy the list
        let storedList = JSON.parse(localStorage.getItem(listName));
        let gameIsInList = false;

        // create the list if it doesn't already exist
        if (!storedList || storedList.length === 0) {
            storedList = []; // make sure it's an array
        } else {
            // list does exist, now check the game isn't already in there
            const indexInList = storedList.findIndex( obj => obj.id === gameObj.id);
            indexInList ? gameIsInList = true : gameIsInList = false;
        }

        if (!gameIsInList) {
            storedList.push(gameObj);
            buttonStyle(true, ev.target,listName);
        } else {
            console.log('already added')
        }

        localStorage.setItem(listName,JSON.stringify(storedList));
    }

    // * this runs on mount so can be used to update state
    // function gameIsInList(listName, gameObj) {
    //     const storedList = JSON.parse(localStorage.getItem(listName));

    //     if (storedList && Array.isArray(storedList) ) {
    //         const gameId = gameObj.id;
    //         const foundId = storedList.findIndex(obj => obj.id === gameId);
    //         console.log('found: ',storedList)
    //         return foundId ? true : false;
    //     } else {
    //         return console.log('error checking if game is in list')
    //     }
    // }

    function buttonStyle(inList, button, listName) {
        if (inList) {
            button.className = 'm-1 btn btn-wide btn-success';
            button.textContent = `In ${listName}!`;
        } else {
            button.className = 'm-1 btn btn-wide btn-secondary';
        }
    }


    if (error) {
        return <p>Could not load game data.</p>
    }

    return (
        <div>
            {
                loading
                ? <div className="text-center"> <Loading /> </div>
                : 
                <div className="m-4">

                    <div className="m-4">
                        <h2 className="view-title">{gameData.name}</h2>
                    </div>

                    <div className="m-4 bg-black rounded-box">
                        { 
                            <img 
                        src={gameData.background_image} 
                        alt={gameData.name} 
                        className="view-game-img rounded-box"
                        /> 
                        }
                    </div>

                    <Card className="m-4 p-4 rounded-box">
                        
                        <div className="game-details">
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
                        className="m-1 btn btn-wide btn-primary"
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

                    <Card className="game-description-wrap m-4 p-4 rounded-box">
                        <h3 className='game-description'>Description</h3>
                        <p className="game-description text-justify"
                        dangerouslySetInnerHTML={
                            { __html: gameData.description}
                            }
                        >

                        </p>
                    </Card>

                    <div className="m-4">
                        <h3>Screenshots</h3>
                        <Screenshots slug={gameData.slug} />
                    </div>

                    <div className="m-4">
                        <h3>Links</h3>
                        <ul>
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

                    <Button className="m-4" type="button"
                    onClick={ () => router.back()}
                    >
                        <FaArrowLeft /> Back
                    </Button>

                </div>
            }
        </div>
    )
    
}