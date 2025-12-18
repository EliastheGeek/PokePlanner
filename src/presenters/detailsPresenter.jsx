import { useSelector, useDispatch } from "react-redux";
import { DetailsView } from "/src/views/detailsView.jsx";
import { addActualMove, setCurrentPokemonName, setEVstat } from "/src/reduxStore.js";
import { doMoveThunk } from "/src/store/searchThunks.js";
export function Details() {

    const dispatch = useDispatch();

    const team = useSelector(
        (state) => state.poke.team
    );

    const currentPokemonName = useSelector(
        (state) => state.poke.currentPokemonName
    );
    function addActualMoveACB(moveName, slot, pokemonIndex){
        const moveNSlot = {moveName:moveName, slot:slot, pokemonIndex:pokemonIndex}; 
        dispatch(addActualMove(moveNSlot))
        dispatch(doMoveThunk(moveNSlot))
    }
    function evChangeACB(newValue, statName, pokemonIndex){
        const evChangeInfo = {newValue:newValue, statName:statName, pokemonIndex:pokemonIndex};
        dispatch(setEVstat(evChangeInfo));
    }
    return <DetailsView team={team} currentPokemonName={currentPokemonName} addMove={addActualMoveACB} evChange={evChangeACB}/>;
};