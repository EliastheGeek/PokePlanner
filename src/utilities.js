export function sortPokemon(pokeArray){//Sortera pokemon från sökresultat utifrån deras id
    function sortPokeIdCB(pokeA,pokeB){
    pokeA.id==pokeB.id?0 : pokeA.id<pokeB.id?-1:1;
    }
    const pokemon = [...pokeArray];
    return pokemon.sort(sortPokeIdCB);
}
export function sortMoves(moveArray){//Sortera moves i en pokemon efter namn
    function sortMoveNameCB(moveA,moveB){
    moveA.move.name==moveB.move.name?0 : moveA.move.name<moveB.move.name?-1:1;
    }
    const moves = [...moveArray];
    return moves.sort(sortMoveNameCB);
}

export function filterMoves(moves){//filtrerar alla moves en pokemon kan ha efter spelversion
    function moveFilterCB(move){//hittas spelversion, behåll, annars ta bort
        findGameVersion(move)?1:0;
    }
const result = moves.filter(moveFilterCB);
return result;
}
const latestVersion = "scarlet-violet"
//hittar om spelversion finns för ett move
function findGameVersion(move){ //kanske ersätta med en variabel currentGameVersion, använder latestVersion
    function checkGameCB(details){
        return details.version_group.name === latestVersion
    }
    const result = move.version_group_details.find(checkGameCB);
    return result;
}
//avancerat, filterera alla pokemon som är tillgängliga för en version. TODO