import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Loading } from 'react-daisyui';

export default function ViewGame() {
    const router = useRouter();

    const [slug, setSlug] = useState(router.query.slug);
    const [gameData, setGameData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('slug: ',slug);
    console.log('gameData: ',gameData);

    useEffect( () => {

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

    },[slug]);

    if (error) {
        return <p>Could not load game data.</p>
    }

    return (
        <div>
            {
                loading
                ? <div> <Loading /> </div>
                : 
                <div>
                    {slug}
                </div>
            }
        </div>
    )
    
}