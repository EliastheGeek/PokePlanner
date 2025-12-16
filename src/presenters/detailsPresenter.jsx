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

    const teamCopy = team.filter(function keepOneCB(team){return currentPokemonName === team.name;});
    const pokemon = teamCopy[0];
    return <DetailsView pokemon={pokemon}/>
};