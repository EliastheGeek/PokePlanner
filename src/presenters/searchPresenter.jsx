import { useSelector, useDispatch } from "react-redux";
import {SearchView} from "/src/views/searchView.jsx"
import {setOpen, showPokemon, addToTeam} from "/src/reduxStore.js"
import { doPokeThunk } from "/src/store/searchThunks.js";

export function Search() {
    const dispatch = useDispatch();

    const open = useSelector((state) => state.poke.open);
    const loading = useSelector((state) => state.poke.loading);
    const showPokemonPromiseState = useSelector((state) => state.poke.showPokemonPromiseState);
    const teamLength = useSelector((state) => state.poke.team.length);

    const handleOpen = () => {
        dispatch(setOpen(true));
        dispatch(showPokemon());
    };

    const handleClose = (param) => {
        dispatch(setOpen(false));
    };

    function selectPokemonACB(pokemon) {
        dispatch(doPokeThunk(pokemon.name));
        dispatch(setOpen(false));
    }

    return  <SearchView open = {open} 
                        options = {showPokemonPromiseState.data} 
                        loading = {loading} 
                        handleOpen ={handleOpen} 
                        handleClose ={handleClose} 
                        teamLength={teamLength} 
                        onSelectPokemon={selectPokemonACB}
            />
}