// const objToQueryArgs = (obj) => {
//     return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
// }

function objToQueryArgs (obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

export { objToQueryArgs }
