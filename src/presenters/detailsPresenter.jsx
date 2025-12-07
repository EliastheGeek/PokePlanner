import { useSelector, useDispatch } from "react-redux";
import { DetailsView } from "/src/views/detailsView.jsx";

export function Details() {
    const dispatch = useDispatch();
        const team = useSelector(
        (state) => state.poke.team
    );
        const  currentPokemonName = useSelector(
        (state) => state.poke.currentPokemonName
    );

    return <DetailsView pokemon={team.filter(function keepOneCB(team){team.name === currentPokemonName})}/>
};