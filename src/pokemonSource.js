//TODO Baka ihop searches till en metod
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

export function searchMove(searchParams) {//searchparams är move namn
    const url = "https://pokeapi.co/api/v2/move/" + searchParams;
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB).catch(errorACB);
    function errorACB(error){ console.log("Error in searchPokemon: ", error);}
    function responseACB(response) {return response.json();}
    function resultACB(result) { return result;}
}

export function searchAbility(searchParams) {//searchparams är ability namn
    const url = "https://pokeapi.co/api/v2/ability/" + searchParams;
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB).catch(errorACB);
    function errorACB(error){ console.log("Error in searchAbility: ", error);}
    function responseACB(response) {return response.json();}
    function resultACB(result) { return result;}
}

export function searchItem(searchParams) {//searchparams är item namn
    const url = "https://pokeapi.co/api/v2/item/" + searchParams;
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB).catch(errorACB);
    function errorACB(error){ console.log("Error in searchItem: ", error);}
    function responseACB(response) {return response.json();}
    function resultACB(result) { return result;}
}
export function searchNature(searchParams) {//searchparams är nature namn
    const url = "https://pokeapi.co/api/v2/nature/" + searchParams;
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB).catch(errorACB);
    function errorACB(error){ console.log("Error in searchNature: ", error);}
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

export function showAllMoves(){
    const url = "https://pokeapi.co/api/v2/move/?offset=0&limit=100000";
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB);

    function responseACB(response) {return response.json();}
    function resultACB(result) {return result.results;}
}

export function showAllItems(){
    function filterItemOptions(itemResults){
        // Ensure we have the expected shape and deduplicate by item.name (case-insensitive)
        if (!itemResults || !Array.isArray(itemResults.results)) return itemResults;
        const seen = new Set();
        const uniqueResults = itemResults.results.filter(item => {
            const name = item && item.name ? String(item.name).toLowerCase().trim() : '';
            if (seen.has(name)) return false;
            seen.add(name);
            return true;
        });
        return { ...itemResults, results: uniqueResults };
    }
    const url = "https://pokeapi.co/api/v2/item/?offset=0&limit=100000";
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB);
    
    function responseACB(response) {return response.json();}
    function resultACB(result) {const filteredResults = filterItemOptions(result);
        return filteredResults.results;}
}   


export function showAllAbilities(){
    const url = "https://pokeapi.co/api/v2/ability/?offset=0&limit=100000";
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB);

    function responseACB(response) {return response.json();}
    function resultACB(result) {return result.results;}
}
export function showAllNatures(){
    const url = "https://pokeapi.co/api/v2/nature/?offset=0&limit=100000";
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB);

    function responseACB(response) {return response.json();}
    function resultACB(result) {return result.results;}
}
//TODO 