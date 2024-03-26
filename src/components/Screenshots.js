import { useState } from "react";
import { Carousel } from "react-daisyui";

export default function Screenshots(props) {

    const [gameScreenshots, setGameScreenshots] = useState(props.data.results);

    return (
        <div>
            {
                gameScreenshots?.length > 0 
                ?
                <Carousel display="numbered" snap="center" className="max-h-[500px]">
                    { 
                        gameScreenshots.map( screenshot => (
                            <Carousel.Item key={screenshot.id} className="max-w-[600px]" src={screenshot.image} alt="game screenshot" />
                        )
                    )}
                </Carousel>
                :
                <p>No screenshots available for this game.</p>
            }
        </div>
        
    )
}