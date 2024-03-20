import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Button, Loading } from "react-daisyui";
import { silkscreen } from "@/fonts";
import { FaEye, FaT, FaTrash } from "react-icons/fa6";

export default function ListCard({game, listName, handleClick}) {

    console.log(handleClick)
    
    const router = useRouter();

    const [loading, setLoading] = useState(false)

    return (
        <Card compact className="search-card">
                {
                    game.background_image
                    &&
                    <Card.Image src={game.background_image} alt={game.title} className="aspect-video object-cover"/>
                }
            <Card.Body className="flex flex-col justify-between relative">
                {
                    loading
                    &&
                    <Loading className="absolute"/>
                }
                <Card.Title tag="h3" className={`p-2 mx-auto text-center text-xl ${silkscreen.className}`}>
                    {game.name}
                </Card.Title>
                <Card.Actions className="p-2 mx-auto flex flex-wrap justify-center items-center mb-4">

                    <Button
                    onClick={() => {
                        setLoading(true);
                        router.push( {
                            pathname: '/' + game.slug,
                            })
                    }}
                    aria-label="view" className="btn btn-sm btn-primary text-primary-content">
                        <FaEye /> View
                    </Button>
                    <Button 
                    aria-label="delete"
                    className="btn btn-sm btn-danger"
                    onClick={(ev) => handleClick(listName,game)}>
                        <FaTrash className="text-error"/> Delete
                    </Button>

                </Card.Actions>
            </Card.Body>
        </Card>
    )
}

