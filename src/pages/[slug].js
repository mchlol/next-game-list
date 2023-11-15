import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Loading, Card, Button, Badge } from 'react-daisyui';
import { formatDate, joinArray, joinPlatformArray } from '@/functions';
import Screenshots from '@/components/Screenshots';

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
            console.log(res.data);
            setGameData(res.data);
            setLoading(false);
        })
        .catch( err => {
            console.log('Error: ',error);
            setError(err);
            setLoading(false);
        })
    }

    if (error) {
        return <p>Could not load game data.</p>
    }

    return (
        <div>
            {
                loading
                ? <div> <Loading /> </div>
                : 
                <div className="m-4">

                    <div className="m-4">
                        <h2>{gameData.name}</h2>
                    </div>

                    <div className="m-4">
                        { 
                            <img 
                        src={gameData.background_image} 
                        alt={gameData.name} 
                        className="view-game-img rounded-box"
                        /> 
                        }
                    </div>

                    <Card className="m-4 p-4">
                        <p>
                            <strong>Released:</strong> 
                            <span>{formatDate(gameData.released)}</span>
                        </p>
                        <p>
                            <strong>Developers:</strong> 
                            <span>{joinArray(gameData.developers)}</span>
                        </p>
                        <p>
                            <strong>Platforms:</strong> 
                            <span>{joinPlatformArray(gameData.parent_platforms)}</span>
                        </p>
                        <p>
                            <strong>Genres:</strong> 
                            <span>{joinArray(gameData.genres)}</span>
                        </p>
                        <p>
                            <strong>Metacritic rating:</strong> 
                            {gameData.metacritic ? <Badge color="accent">{gameData.metacritic}</Badge> : <span>N/A</span> }
                        </p>
                    </Card>

                    <div className="m-4 text-center">
                        <Button className="m-1">
                            Add to wishlist
                        </Button>
                        <Button className="m-1">
                            Add to favourites
                        </Button>
                    </div>

                    <div className="game-description-wrap m-4 text-justify rounded-box">
                        <h3>Description</h3>
                        <p className="game-description mx-auto"
                        dangerouslySetInnerHTML={
                            { __html: gameData.description}
                            }
                        >

                        </p>
                    </div>

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
                        Back
                    </Button>

                </div>
            }
        </div>
    )
    
}