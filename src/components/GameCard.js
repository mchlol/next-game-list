import { useState } from "react";
import { Card, Button, Loading } from "react-daisyui";
import { formatDate } from "@/functions";
import { FaEye } from "react-icons/fa6";
import { useRouter } from "next/router";


export default function GameCard(props) {

    const router = useRouter();
    const [game, setGame] = useState(props.game);
    const [loading, setLoading] = useState(false);

    return (
        <Card bordered className="search-card relative">
            {game.background_image
            && 
            <Card.Image 
            className="game-img"
            src={game.background_image}
            alt={game.name}
            />
            }

            <Card.Body>

            {
                loading && <Loading color="primary" size="lg" className="absolute bottom-4 right-4"/>
            }
                <Card.Title tag="h2" className="break-all">{game.name}</Card.Title>
                <span>
                    Released {formatDate(game.released)}
                </span>
                <Card.Actions>
                    
                    <Button className="btn btn-sm btn-primary"
                    onClick={ () => {
                            setLoading(true);
                            router.push( {
                                pathname: '/' + game.slug,
                            });
                        }
                    }>
                        <FaEye /> View
                    </Button>
                    

                </Card.Actions>

            </Card.Body>

        </Card>
    )
}