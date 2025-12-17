import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TeamView } from "/src/views/teamView.jsx";
import {addToTeam,removeFromTeam, setCurrentPokemonName, setOpen, showPokemon} from "/src/reduxStore.js";

export function Team(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const team = useSelector(
        (state) => state.poke.team
    );
    const handleOpen = () => {
        dispatch(setOpen(true));
        dispatch(showPokemon());
    };
    const handleClose = (param) => {
        dispatch(setOpen(false));
    };
    return <TeamView team={team}
                     handleOpen ={handleOpen} 
                     handleClose ={handleClose}
                     onRemoveFromTeam={removeFromTeamACB}
                     onClickPokemon={showDetailsACB}/>;

    function removeFromTeamACB(param){
        dispatch(removeFromTeam(param));
    }

    function showDetailsACB(name){
        dispatch(setCurrentPokemonName(name));
        navigate(`/details`);
    }
};
