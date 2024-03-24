import { useState, useEffect } from "react";
import { Carousel, Loading } from "react-daisyui";
import axios from "axios";

export default function Screenshots(props) {

    const [slug, setSlug] = useState(props.slug);
    const [gameScreenshots, setGameScreenshots] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {

        setLoading(true);
        
        axios.get(`https://rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then( res => {
            setGameScreenshots(res.data.results);
            setLoading(false);
        })
        .catch( err => {
            console.log('Error: ',error);
            setError(err);
            setLoading(false);
        })

    },[slug]);


    return (
        <div>
            {
                loading
                ? 
                <Loading />
                :
                <Carousel display="numbered" snap="center" >
                    { 
                        gameScreenshots.map( screenshot => <Carousel.Item key={screenshot.id} className="max-w-[600px]" src={screenshot.image} alt="game screenshot" />
                    )}
                </Carousel>
            }
        </div>
        
    )
}