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


export { 
    formatDate, 
    joinArray,
    joinPlatformArray,
};