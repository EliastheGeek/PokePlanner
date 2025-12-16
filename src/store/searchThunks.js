import { doSearch,addToTeam} from "/src/reduxStore.js";
import { searchPokemon } from "/src/pokemonSource.js";

export function doPokeThunk(pokeQuery) {
    return async function (dispatch, getState) {
        if(!pokeQuery) return;
        const results = await searchPokemon(pokeQuery);

        dispatch(addToTeam(results));
    }
}

window.doPokeThunk = doPokeThunk();