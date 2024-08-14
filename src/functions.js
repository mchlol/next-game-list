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
            console.warn('Could not determine month');
    }

    let dateString = `${day} ${month} ${year}`;
    return dateString;
    }
    
}; 


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

function giveSuggestion() {
    const suggestions = [
      'red-dead-redemption',
      'red-dead-redemption-2',
      'cyberpunk-2077',
      'control',
      'deathloop-2',
      'hypnospace-outlaw',
      'lemmings',
      'la-noire',
      'bioshock',
      'unpacking-2',
      'superliminal',
      'moving-out-2',
      'going-under',
      'a-short-hike',
      'stardew-valley'
    ]
  
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  }

function getParamsString(obj) {
    let string = '?'; 

    // ! way too rigid
    if ('genre' in obj) {
      string+= `search=${obj.title}&genre=${obj.genre}&page=${obj.page}&`
    } else {
      string+= `search=${obj.title}&page=${obj.page}&`;
    }
    return string
  };

function filterByGenre(gamesArr, targetGenre) {
    targetGenre = targetGenre[0].toUpperCase() + targetGenre.slice(1);
    return gamesArr.filter(game => game.genres.some(genre => genre.name === targetGenre))
}


export { 
    formatDate, 
    joinArray,
    joinPlatformArray,
    giveSuggestion,
    getParamsString,
    filterByGenre
};