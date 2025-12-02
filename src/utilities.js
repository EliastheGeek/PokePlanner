import { version } from "react";

export function sortPokeIdCB(pokeA,pokeB){
    pokeA.id==pokeB.id?0 : pokeA.id<pokeB.id?-1:1;
}

export function sortPokemon(pokeArray){//Sortera pokemon från sökresultat utifrån deras id
    const pokemon = [...pokeArray];
    return pokemon.sort(sortPokeIdCB);
}

export function filterMoves(moves){//filtrerar alla moves en pokemon kan ha efter spelversion
    function moveFilterCB(move){//hittas spelversion, behåll, annars ta bort
        findGameVersion(move)?1:0;
    }
const result = moves.filter(moveFilterCB);
return result;
}

//hittar om spelversion finns för ett move
function findGameVersion(move){ //kanske ersätta med en variabel currentGameVersion
    function checkGameCB(details){
        return details.version_group.name === "platinum"
    }
    const result = move.version_group_details.find(checkGameCB);
    return result;
}
//avancerat, filterera alla pokemon som är tillgängliga för en version.