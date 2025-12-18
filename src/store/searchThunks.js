import { doSearch,addToTeam, addMoveInfo, setAbility} from "/src/reduxStore.js";
import { searchPokemon, searchMove, searchAbility } from "/src/pokemonSource.js";

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
export function doAbilityThunk(abilityInfo) {
    return async function (dispatch, getState) {
        if(!abilityInfo.abilityName) return;
        const results = await searchAbility(abilityInfo.abilityName);
        const abilityData = {results: results, index: abilityInfo.pokemonIndex};
        dispatch(setAbility(abilityData));
    }
}

window.doPokeThunk = doPokeThunk();