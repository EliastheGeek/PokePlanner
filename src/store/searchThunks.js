import { doSearch,addToTeam, addMoveInfo, setAbility, setItem, setNature} from "/src/reduxStore.js";
import { searchPokemon, searchMove, searchAbility, searchItem, searchNature } from "/src/pokemonSource.js";

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
export function doItemThunk(itemInfo) {

    return async function (dispatch, getState) {
        if(!itemInfo.itemName) return;
        const results = await searchItem(itemInfo.itemName);
        const itemData = {results: results, index: itemInfo.pokemonIndex};
        dispatch(setItem(itemData));
    }
}
export function doNatureThunk(natureInfo) {
    return async function (dispatch, getState) {
        if(!natureInfo.natureName) return;
        const results = await searchNature(natureInfo.natureName);
        const natureData = {results: results, index: natureInfo.pokemonIndex};
        dispatch(setNature(natureData));
    }
}

window.doPokeThunk = doPokeThunk();