import { useState, useEffect } from "react";
import { createContext } from "react";

const ListDisplayContext = createContext();
export { ListDisplayContext };

export default function ListDisplay({listName}) {

    const [listContents, setListContents] = useState([]);
    const [listChanged, setListChanged] = useState(false);

    useEffect( () => {
        const storedList = JSON.parse(localStorage.getItem(listName));
        // reverse the list to show newest added first
        let reversed = [...storedList].reverse();

        if (storedList) {
            setListContents(reversed);
        } 

    }, [listChanged]); 

    function deleteFromList(listName, id) {
        const storedList = JSON.parse(localStorage.getItem(listName));
        const foundId = storedList.findIndex( obj => obj.id === id);
        storedList.splice(foundId, 1);
        localStorage.setItem(listName, JSON.stringify(storedList));

        setListContents(storedList);

        setListChanged(true);
    }

    function handleClick(listName, game) {
        deleteFromList(listName,game.id)
    }

    return (
        <ListDisplayContext.Provider value={ {listName, handleClick }}>
            <div className="list-container m-4 p-4">

                    <span className="list-anchor" id={listName}></span>

                    <ListDisplay.Title>
                        {listName === 'wishlist' ? 'Wishlist' : 'Favourites'}
                    </ListDisplay.Title>

                    <div className='grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3
                        grid-cols-1 gap-4'>
                    {
                        listContents.length > 0
                        ?
                        listContents.map(game => 
                        <ListDisplay.Card 
                        game={game} 
                        listName={listName} handleClick={handleClick}/>
                        )
                        :
                        <p>No games in list.</p>
                    }
                    </div>
            </div>
            
        </ListDisplayContext.Provider>
    )
}

{/* <ListDisplay.Card 
game={game} 
list={listName} 
changeList={setListChanged(prevListChanged => !prevListChanged)}
/> */}