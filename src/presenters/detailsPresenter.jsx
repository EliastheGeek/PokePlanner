import { useSelector, useDispatch } from "react-redux";
import { DetailsView } from "/src/views/detailsView.jsx";
import { addActualMove } from "/src/reduxStore.js";
export function Details() {
    const dispatch = useDispatch();
        const team = useSelector(
        (state) => state.poke.team
    );
        const  currentPokemonName = useSelector(
        (state) => state.poke.currentPokemonName
    );
    function addActualMoveACB(moveName, slot, pokemonIndex){
        const moveNSlot = {moveName:moveName, slot:slot, pokemonIndex:pokemonIndex}; 
        dispatch(addActualMove(moveNSlot)) }

    return <DetailsView team={team} currentPokemonName={currentPokemonName} addMove={addActualMoveACB}/>
};