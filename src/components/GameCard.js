import { useState } from "react";
import { Card, Button } from "react-daisyui";
import { formatDate } from "@/functions";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";


export default function GameCard(props) {
    const [game, setGame] = useState(props.game);

    return (
        <Card bordered={false} className="search-card">
            {game.background_image
            && 
            <Card.Image 
            className="game-img"
            src={game.background_image}
            alt={game.name}
            />
            }

            <Card.Body>
                <Card.Title tag="h2" className="break-all">{game.name}</Card.Title>
                <span>
                    Released {formatDate(game.released)}
                </span>
                <Card.Actions>
                    
                    <Link href={ {
                        pathname: "/" + game.slug
                    } }>
                        <Button className="btn btn-sm btn-primary">
                            <FaEye /> View
                        </Button>
                    </Link>

                </Card.Actions>

            </Card.Body>

        </Card>
    )
}