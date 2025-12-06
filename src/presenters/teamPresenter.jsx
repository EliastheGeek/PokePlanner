import { useSelector, useDispatch } from "react-redux";
import { TeamView } from "/src/views/teamView.jsx";
import {addToTeam,removeFromTeam,currentPokemon} from "/src/reduxStore.js";

export function Team(){
    const dispatch = useDispatch();

    const team = useSelector(
        (state) => state.poke.team
    );

    const currentPokemonName = useSelector(
        (state) => state.poke.currentPokemonName
    );

    return <TeamView team={team}
                     currentPokemonName={currentPokemonName}
                     onAddToTeam={addToTeamACB}
                     onRemoveFromTeam={removeFromTeamACB}
                     onClickPokemon={showDetailsACB}/>;
    function addToTeamACB(param){
        dispatch(addToTeam(param));
    }
    function removeFromTeamACB(param){
        dispatch(removeFromTeam(param));
    }
    function showDetailsACB(param){
        dispatch(currentPokemon(param));
    }
};
