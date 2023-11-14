import { useState } from "react";
import { Card, Button } from "react-daisyui";

export default function GameCard(props) {
    const [game, setGame] = useState(props.game);
    // console.log('GameCard props: ',props);
    return (
        <Card 
            className="game-card max-w-md"
            // onClick={ () => }
            key={game.slug}
        >
            {game.background_image
            && 
            <Card.Image 
            className="game-img"
            src={game.background_image}
            alt={game.name}
            />
            }

            <Card.Body>
                <Card.Title tag="h2">{game.name}</Card.Title>
                <span>
                    Released {game.released}
                </span>
                <Card.Actions className="justify-end">
                    <Button className="btn btn-sm btn-primary">View</Button>
                </Card.Actions>

            </Card.Body>

        </Card>
    )
}