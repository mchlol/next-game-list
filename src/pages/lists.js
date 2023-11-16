import { useState, useEffect } from 'react';

export default function Lists() {

    const [wishlist,setWishlist] = useState([]);
    const [favourites,setFavourites] = useState([]);
    const [listChanged,setListChanged] = useState(false);

    useEffect( () => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        const storedFavourites = JSON.parse(localStorage.getItem('favourites'));

        storedWishlist && setWishlist(wishlist);
        storedFavourites && setFavourites(favourites);


    }, [listChanged]); 

    function deleteFromList(listName, gameObj) {
        // copy the list from storage
        const storedList = JSON.parse(localStorage.getItem(listName));
        // find the index of the game in the list
        const gameId = gameObj.id; // value to search for
        const foundId = getList.findIndex( obj => obj.id === gameId);
        // remove the matching object
        storedList.splice(foundId, 1);
        // overwrite the stored list
        localStorage.setItem(listName, JSON.stringify(storedList));
        setListChanged(true);
        setWishlist(storedList);
    }

    return (
        <div className="lists-wrap">
            <div className="list-container m-4 p-4">
                <h3>Wishlist</h3>
                <div className="grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
                {
                    wishlist.length > 0
                    ?
                    <p>Games go here!</p>
                    :
                    <p>No games in wishlist.</p>
                }
                </div>
            </div>
            <div className="list-container m-4 p-4">
                <h3>Favourites</h3>
                <div className="grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
                {
                    favourites.length > 0
                    ?
                    <p>Games go here!</p>
                    :
                    <p>No games in favourites.</p>
                }
                </div>
            </div>
        </div>
    )
}