import { useState, useEffect } from 'react';
import { Card, Button } from 'react-daisyui';
import { FaEye, FaTrash } from "react-icons/fa6";
import Link from 'next/link';

export default function Lists() {

    const [wishlist, setWishlist] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [listChanged, setListChanged] = useState(false);

    useEffect( () => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        const storedFavourites = JSON.parse(localStorage.getItem('favourites'));

        if (storedWishlist.length > 0) {
            setWishlist(storedWishlist);
        } 

        if (storedFavourites.length > 0) {
            setFavourites(storedFavourites);
        }

    }, [listChanged]); 

    function deleteFromList(listName, id) {
        // copy the list from storage
        const storedList = JSON.parse(localStorage.getItem(listName));
        // find the index of the game in the list
        const foundId = storedList.findIndex( obj => obj.id === id);
        // remove the matching object from stored list
        storedList.splice(foundId, 1);
        // overwrite the stored list
        localStorage.setItem(listName, JSON.stringify(storedList));
        // update state
        setWishlist(storedList);
        // run useEffect
        setListChanged(true);
    }

    function handleClick(ev, listName, game) {
        deleteFromList(listName,game.id)
    }

    function handleMouseEnter(ev,game) {
        console.log('ev',ev.target);
        const container = ev.target.offsetParent;
        container.style.backgroundImage = game.background_image;
    }

    return (
        <div className="lists-wrap">
            <div className="list-container m-4 p-4 rounded-box card-bordered">
                <h2>Wishlist</h2>
                <div className="p-4 grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {
                    wishlist.length > 0
                    ?
                    wishlist.map(game => 
                    <Card>
                        {game.background_image
                        && 
                        <Card.Image 
                        className="game-img"
                        src={game.background_image}
                        alt={game.name}
                        />
                        }
                        <Card.Title tag="h4" className="p-2">{game.name}</Card.Title>
                        <Card.Actions className="p-2">

                            <Link href={ {
                                pathname: '/' + game.slug
                            }}>
                                <Button
                                className="btn btn-sm"
                                aria-label="view">
                                    <FaEye /> View
                                </Button>
                            </Link>

                            <Button 
                            className="btn btn-sm" 
                            aria-label="delete"
                            onClick={(ev) => handleClick(ev,'wishlist',game)}>
                                <FaTrash className="text-warning"/> Delete
                            </Button>
                        </Card.Actions>

                    </Card>)
                    :
                    <p>No games in wishlist.</p>
                }
                </div>
            </div>
            <div className="list-container m-4 p-4 rounded-box card-bordered">
                <h2>Favourites</h2>
                <div className="flex flex-wrap gap-4 p-4">
                {
                    favourites.length > 0
                    ?
                    favourites.map(game => 
                    <Card data-game-card={`game-card-${game.id}`}
                    onMouseEnter={ (ev) => {
                        handleMouseEnter(ev,game);
                    }}>
                        <Card.Title tag="h4" className="p-2">{game.name}</Card.Title>
                        <Card.Actions className="p-2">
                            <Link href={ {
                            pathname: "/" + game.slug
                            } }>
                                <Button aria-label="view" className="btn btn-sm">
                                    View
                                </Button>
                            </Link>
                            
                            <Button aria-label="delete"
                            className="btn btn-sm btn-danger"
                            onClick={(ev) => handleClick(ev,'favourites',game)}>
                                <FaTrash className="text-warning"/> Delete
                            </Button>
                        </Card.Actions>

                    </Card>)
                    :
                    <p>No games in favourites.</p>
                }
                </div>
            </div>
        </div>
    )
}