import { filterItemOptions } from "./utilities";
export function searchAPI(type, searchParams){
    const url = "https://pokeapi.co/api/v2/" + type + "/" + searchParams;
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB).catch(errorACB);
    function errorACB(error){ console.log("Error in searchAPI: ", error);}
    function responseACB(response) {return response.json();}
    function resultACB(result) { return result;}
}

export function showAllAPI(type){
    const url = "https://pokeapi.co/api/v2/"+ type +"/?offset=0&limit=100000";
    const options = {
        method: "GET",
    };
    return fetch(url, options).then(responseACB).then(resultACB);
    function responseACB(response) {return response.json();}
    function resultACB(result) {
        if(type==="item"){
            const filteredResults = filterItemOptions(result);
            return filteredResults.results;
        }
        return result.results;}
}