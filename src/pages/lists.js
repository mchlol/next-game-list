import { useState, useEffect } from 'react';
import { Card, Button } from 'react-daisyui';

export default function Lists() {

    const [wishlist, setWishlist] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [listChanged, setListChanged] = useState(false);

    console.log('wishlist in state: ', wishlist);

    useEffect( () => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        const storedFavourites = JSON.parse(localStorage.getItem('favourites'));

        console.log('storedWishList: ',storedWishlist);

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

    return (
        <div className="lists-wrap">
            <div className="list-container m-4 p-4 rounded-box card-bordered">
                <h3>Wishlist</h3>
                <div className="flex flex-wrap gap-4">
                {
                    wishlist.length > 0
                    ?
                    wishlist.map(game => <Card bordered="false">
                        <Card.Title tag="h4">{game.name}</Card.Title>
                        <Card.Actions>
                            <Button>
                                View
                            </Button>
                            <Button
                            onClick={(ev) => handleClick(ev,'wishlist',game)}>
                                Delete
                            </Button>
                        </Card.Actions>

                    </Card>)
                    :
                    <p>No games in wishlist.</p>
                }
                </div>
            </div>
            <div className="list-container m-4 p-4 rounded-box card-bordered">
                <h3>Favourites</h3>
                <div className="flex flex-wrap gap-4">
                {
                    favourites.length > 0
                    ?
                    favourites.map(game => <Card bordered="false">
                        <Card.Title tag="h4">{game.name}</Card.Title>
                        <Card.Actions>
                            <Button className="btn btn-sm">
                                View
                            </Button>
                            <Button
                            className="btn btn-sm btn-danger"
                            onClick={(ev) => handleClick(ev,'favourites',game)}>
                                Delete
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