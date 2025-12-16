import { useSelector, useDispatch } from "react-redux";
import { TeamView } from "/src/views/teamView.jsx";
import {addToTeam,removeFromTeam, setCurrentPokemonName} from "/src/reduxStore.js";


export function Team(){
    const dispatch = useDispatch();

    const team = useSelector(
        (state) => state.poke.team
    );



    return <TeamView team={team}
                     onRemoveFromTeam={removeFromTeamACB}
                     onClickPokemon={showDetailsACB}/>;
    function removeFromTeamACB(param){
        dispatch(removeFromTeam(param));
    }
    function showDetailsACB(name){
        dispatch(setCurrentPokemonName(name));
    }
};
