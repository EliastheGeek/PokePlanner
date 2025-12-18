import { doSearch,addToTeam, addMoveInfo} from "/src/reduxStore.js";
import { searchPokemon, searchMove } from "/src/pokemonSource.js";

export function doPokeThunk(pokeQuery) {
    return async function (dispatch, getState) {
        if(!pokeQuery) return;
        const results = await searchPokemon(pokeQuery);

        dispatch(addToTeam(results));
    }
}
export function doMoveThunk(moveNSlot) {
    return async function (dispatch, getState) {
        if(!moveNSlot.moveName) return;
        const results = await searchMove(moveNSlot.moveName);
        const moveData = {results: results, index: moveNSlot.pokemonIndex, slot: moveNSlot.slot};
        dispatch(addMoveInfo(moveData));
    }
}

window.doPokeThunk = doPokeThunk();