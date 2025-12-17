export function searchPokemon(searchParams) {//searchparams är pokemon namn
    const url = "https://pokeapi.co/api/v2/pokemon/" + searchParams;
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB).catch(errorACB);
function errorACB(error){ console.log("Error in searchPokemon: ", error);}
    function responseACB(response) {return response.json();}
    function resultACB(result) { return result;}
}

export function showAllPokemon(){
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1328";
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB);

    function responseACB(response) {return response.json();}
    function resultACB(result) {return result.results;}
}
//TODO 