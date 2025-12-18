import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { DetailsView } from "/src/views/detailsView.jsx";
import { addActualMove, setCurrentPokemon, setEVstat, setAbility } from "/src/reduxStore.js";
import { doMoveThunk } from "/src/store/searchThunks.js";

export function Details() {

    const dispatch = useDispatch();

    const team = useSelector(
        (state) => state.poke.team
    );

    const currentPokemonName = useSelector(
        (state) => state.poke.currentPokemonName
    );

    const pokemonIndex = team.findIndex(
        p => p?.name === currentPokemonName
    );

    const pokemon = pokemonIndex >= 0 ? team[pokemonIndex] : null;

    function nextPokemonACB() {
        if (pokemonIndex < 0) return;

        const nextIndex = pokemonIndex + 1;
        if (nextIndex >= team.length) return;

        dispatch(setCurrentPokemon(team[nextIndex].name));
    }

    function previousPokemonACB() {
        if (pokemonIndex < 0) return;

        const prevIndex = pokemonIndex - 1;
        if (prevIndex < 0) return;

        dispatch(setCurrentPokemon(team[prevIndex].name));
    }
        
    function addActualMoveACB(moveName, slot, pokemonIndex){
        const moveNSlot = {moveName:moveName, slot:slot, pokemonIndex:pokemonIndex}; 
        dispatch(addActualMove(moveNSlot))
        dispatch(doMoveThunk(moveNSlot))
    }

    function evChangeACB(pokemonIndex, statName, newValue){
        const evChangeInfo = {newValue:newValue, statName:statName, pokemonIndex:pokemonIndex};
        dispatch(setEVstat(evChangeInfo));
    }
    function setAbilityACB(abilityName, pokemonIndex){
        const abilityInfo = {abilityName:abilityName, pokemonIndex:pokemonIndex};
        dispatch(setAbility(abilityInfo));
    }
    useEffect(() => {
        if (team.length === 0) return;

        if (pokemonIndex === -1) {
            dispatch(setCurrentPokemon(team[0].name));
        }
    }, [team, pokemonIndex, dispatch]);

    return <DetailsView team={team} 
                        pokemon={pokemon}
                        pokemonIndex={pokemonIndex}
                        onNext={nextPokemonACB}
                        onPrevious={previousPokemonACB}
                        addMove={addActualMoveACB} 
                        evChange={evChangeACB}
                        setAbility={setAbilityACB}/>;
};