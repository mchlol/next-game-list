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

        if (storedWishlist) {
            setWishlist(storedWishlist);
        } 

        if (storedFavourites) {
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

    return (
        <div className="lists-wrap">

            <div className="list-container m-4 p-4">
                <span className="list-anchor" id="wishlist"></span>
                <h2 className="text-center mb-8">Wishlist</h2>
                <div className='grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3
                    grid-cols-1 gap-4'>
                {
                    wishlist.length > 0
                    ?
                    wishlist.map(game => 
                    <Card className="search-card" key={game.id} data-game-card={`game-card-${game.id}`}>
                        {game.background_image
                        && 
                        <Card.Image 
                        className="list-game-img"
                        src={game.background_image}
                        alt={game.name}
                        />
                        }
                        <Card.Title tag="h4" className="p-2 mx-auto text-center">{game.name}</Card.Title>
                        <Card.Actions className="p-2 mx-auto">
                            <Link href={ {
                            pathname: "/" + game.slug
                            } }>
                                <Button aria-label="view" className="btn btn-sm btn-primary text-primary-content">
                                    <FaEye /> View
                                </Button>
                            </Link>
                            
                            <Button aria-label="delete"
                            className="btn btn-sm btn-danger"
                            onClick={(ev) => handleClick(ev,'wishlist',game)}>
                                <FaTrash className="text-error"/> Delete
                            </Button>
                        </Card.Actions>

                    </Card>)
                    :
                    <p>No games in wishlist.</p>
                }
                </div>
            </div>

            <div className="list-container m-4 p-4">
            <span className="list-anchor" id="favourites"></span>
                <h2 className="lg:text-2xl text-center mb-8">Favourites</h2>
                <div className='grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3
                    grid-cols-1 gap-4'>
                {
                    favourites.length > 0
                    ?
                    favourites.map(game => 
                    <Card className="search-card" key={game.id} data-game-card={`game-card-${game.id}`}>
                        {game.background_image
                        && 
                        <Card.Image 
                        className="list-game-img"
                        src={game.background_image}
                        alt={game.name}
                        />
                        }
                        <Card.Title tag="h4" className="p-2 mx-auto text-center">{game.name}</Card.Title>
                        <Card.Actions className="p-2 mx-auto">
                            <Link href={ {
                            pathname: "/" + game.slug
                            } }>
                                <Button aria-label="view" className="btn btn-sm btn-primary text-primary-content">
                                    <FaEye /> View
                                </Button>
                            </Link>
                            
                            <Button aria-label="delete"
                            className="btn btn-sm btn-danger"
                            onClick={(ev) => handleClick(ev,'favourites',game)}>
                                <FaTrash className="text-error"/> Delete
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