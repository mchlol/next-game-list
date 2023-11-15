import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Loading, Card, Button, Badge } from 'react-daisyui';
import { formatDate, joinArray, joinPlatformArray } from '@/functions';
import GameCard from '@/components/GameCard';

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

                    <div className="m-4 flex flex-wrap justify-between">
                        <h2>{gameData.name}</h2>
                        <Button type="button"
                    onClick={ () => router.back()}
                    >
                        Back
                    </Button>
                    </div>

                    <div className="m-4">
                        { 
                            <img 
                        src={gameData.background_image} 
                        alt={gameData.name} 
                        className="view-game-img"
                        /> 
                        }
                    </div>

                    <Card className="m-4 p-4">
                        <p><strong>Released:</strong> <span >{formatDate(gameData.released)}</span> </p>
                        <p><strong>Developers:</strong> {joinArray(gameData.developers)}</p>
                        <p><strong>Platforms:</strong> {joinPlatformArray(gameData.parent_platforms)}</p>
                        <p><strong>Genres:</strong> {joinArray(gameData.genres)}</p>
                        <p>
                        <strong>Metacritic rating:</strong> {gameData.metacritic ? <Badge color="accent">{gameData.metacritic}</Badge> : <span>N/A</span> }
                        </p>
                    </Card>

                    <div className="m-4">
                        <Button className="m-1">
                            Add to wishlist
                        </Button>
                        <Button className="m-1">
                            Add to favourites
                        </Button>
                    </div>

                    <div className="game-description m-4">
                        <p 
                        dangerouslySetInnerHTML={
                            { __html: gameData.description}
                            }
                        >

                        </p>
                    </div>

                    <div className="m-4">
                        <h3>Screenshots</h3>
                    </div>

                    <Link className="m-4" href={`https://rawg.io/games/${gameData.slug}/suggestions`} target="_blank" rel="noreferrer">
                        <Button>
                            View similar games on RAWG.io
                        </Button>
                    </Link>

                </div>
            }
        </div>
    )
    
}