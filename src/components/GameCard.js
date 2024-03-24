import { useState } from "react";
import { Card, Button, Loading } from "react-daisyui";
import { formatDate } from "@/functions";
import { FaEye } from "react-icons/fa6";
import { useRouter } from "next/router";
import Image from "next/image";

export default function GameCard(props) {

    const router = useRouter();
    const [game, setGame] = useState(props.game);
    const [loading, setLoading] = useState(false);

    return (
        <Card bordered 
        className="
        shadow-xl  
        relative
        bg-secondary
        bg-cover
        bg-no-repeat
        cannotHover:grad-bg
        canHover:mix-blend-screen 
        canHover:bg-secondary
        canHover:hover:grad-bg 
        canHover:hover:mix-blend-normal
        "
        >

            {
                game.background_image
                && 
                <Image 
                className="object-cover aspect-[3/2]"
                style={{borderRadius: "1rem 1rem 0 0"}}
                src={game.background_image}
                alt={game.name}
                width="800"
                height="500"
                />
            }

            <Card.Body className="relative">

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