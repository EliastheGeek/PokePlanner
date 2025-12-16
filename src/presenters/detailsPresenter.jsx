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
    function addActualMoveACB(moveName, slot){ dispatch(addActualMove(moveName, slot)) }

    return <DetailsView team={team} currentPokemonName={currentPokemonName} addMove={addActualMoveACB}/>
};