// contains any functions that may need to be used in more than one component.

const formatDate = function(date) {
    if (date === null || date === undefined) {
        return 'Unknown';
    } else {
        // date is either null or YYYY-MM-DD
    const year = date.slice(0,4);
    let month = date.slice(5,7);
    const day = date.slice(8,10)

    switch(month) {
        case '01':
            month = 'January';
            break;
        case '02':
            month = 'February';
            break;
        case '03':
            month = "March";
            break;
        case '04':
            month = 'April';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'June';
            break;
        case '07':
            month = 'July';
            break;
        case '08':
            month = 'August';
            break;
        case '09':
            month = 'September';
            break;
        case '10':
            month = 'October';
            break;
        case '11':
            month = 'November';
            break;
        case '12':
            month = 'December';
            break;
        default:
            console.log('Could not determine month');
    }

    let dateString = `${day} ${month} ${year}`;
    return dateString;
    }
    
}; // formatDate

// list functions
// lists object in local storage should look like
/*
    { lists: {
        { 'wishlist' : [ {gameObj}, {gameObj}, {gameObj} ] }
        { 'played' : [ {gameObj}, {gameObj} ] }
    ]}

    in local storage:
    { 
        'wishlist': [],
    }
*/

const joinArray = function(array) {
    if (array === undefined) {
        return 'Unknown';
    } else {
        let joined = [];
    array.forEach(obj => {
        joined.push(obj.name);
    });
    joined = joined.join(', ');
    return joined;
    }
    
};

const joinPlatformArray = function(array) {
    if (array === undefined) {
        return 'Unknown';
    } else {
    let joined = [];
    array.forEach(obj => {
        joined.push(obj.platform.name);
    })
    joined = joined.join(' | ');
    return joined;
}
}

const createList = function(listName) {
    console.log(`Creating new list in localStorage`);

    const listToAdd = {
        listName: listName,
        listData: [],
    }

    // if the list already exists, it will be overwritten?
    // if it doesn't exist it will be created


    localStorage.setItem('myLists', JSON.stringify(listToAdd));
};

const getList = function(listName) {
    console.log(`Retrieving ${listName} from localStorage`);
    // if a key with this name is in local storage, retrieve it
    // if it doesn't exist, create it
    let userList;
    if (localStorage.getItem(listName)) {
        console.log('list found',userList);
    } else {
        localStorage.setItem(listName,[]);
    }
    console.log('userList',userList)
    return userList;
}

const addToList = function(listName,gameObj) {
        console.log('Adding to local storage');

        // get the required list & store it in a variable
        const list = getList(listName);

        // push the object to the array
        list.push(gameObj);
        // store the new key value back in local storage
        localStorage.setItem(listName,JSON.stringify(list));
        console.log(JSON.parse(localStorage.getItem(list)));
}



const removeFromList = function(listName, gameObj) {
    console.log(`Deleting ${gameObj.slug} from ${listName}`);

    // make a copy of the list in a variable
    const getList = JSON.parse(localStorage.getItem(listName));

    // get the index in the list's array of the specified object
    const gameId = gameObj.id; // the value to search for

    const foundId = getList.findIndex( (element) => element.id === gameId);
    console.log('Found ID:',foundId) // returns the index of the obj with matching id

    // use a method to remove the object with matching id from the list - slice? nope - sPlice
    getList.splice(foundId, 1);
    console.log(getList);
    // save over the list in storage with the new value
    localStorage.setItem(listName,JSON.stringify(getList));
}

export { 
    formatDate, 
    joinArray,
    joinPlatformArray,
    createList,
    addToList,
    removeFromList,
    getList,
};