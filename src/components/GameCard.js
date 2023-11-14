import { useState } from "react";
import { Card, Button } from "react-daisyui";
import { formatDate } from "@/functions";
import Link from "next/link";


export default function GameCard(props) {
    const [game, setGame] = useState(props.game);
    return (
        <Card imageFull>
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
                    Released {formatDate(game.released)}
                </span>
                <Card.Actions>
                    
                    <Link href={ {
                        pathname: "/" + game.slug,
                        query: { slug: game.slug} 
                    } }>
                        <Button className="btn btn-sm btn-primary">View</Button>
                    </Link>

                </Card.Actions>

            </Card.Body>

        </Card>
    )
}