import { useState, useEffect } from "react";
import { Carousel, Loading } from "react-daisyui";
import axios from "axios";

export default function Screenshots(props) {

    console.log('Screenshots props: ',props);

    const [slug, setSlug] = useState(props.slug);
    const [gameScreenshots, setGameScreenshots] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('screenshots: ',gameScreenshots);


    useEffect( () => {

        setLoading(true);
        
        axios.get(`https://rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then( res => {
            console.log(res.data.results);
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
                <Carousel className="screenshot-carousel rounded-box">
                    { 
                        gameScreenshots.map( screenshot => <Carousel.Item key={screenshot.id} className="game-screenshot" src={screenshot.image} alt="game screenshot" />
                    )}
                </Carousel>
            }
        </div>
        
    )
}