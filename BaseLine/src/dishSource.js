import {PROXY_URL, PROXY_KEY} from "/src/apiConfig.js";

export function searchDishes(searchParams) {
    const url = PROXY_URL + "/recipes/complexSearch?" + new URLSearchParams(searchParams);
    const options = {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "480"
        }
    };
    return fetch(url, options).then(responseACB).then(resultACB);

    function responseACB(response) {return response.json();}
    function resultACB(result) {return result.results;}


}

export function getMenuDetails(ids_array) {
    const obj = {"ids": ids_array};

    const url = PROXY_URL + "/recipes/informationBulk?" + new URLSearchParams(obj);
    const options = {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "480"
        }
    };    
    return fetch(url, options).then(responseACB);

    function responseACB(response) {
        if (response.status === 404) throw "rejected promise";
        return response.json();}
}

export function getDishDetails(id) {
    return getMenuDetails([id]).then(objectFromArrayACB);

    function objectFromArrayACB(array) {
        return array[0];
    }
}