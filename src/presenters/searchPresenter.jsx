import { useSelector, useDispatch } from "react-redux";
import {SearchView} from "/src/views/searchView.jsx"
import {setOpen, showPokemon} from "/src/reduxStore.js"
import { addToTeam, doSearch } from "@/reduxStore";
import { doPokeThunk } from "@/store/searchThunks";

export function Search() {
    const dispatch = useDispatch();

    const open = useSelector((state) => state.poke.open);
    const loading = useSelector((state) => state.poke.loading);
    const showPokemonPromiseState = useSelector((state) => state.poke.showPokemonPromiseState);
    const teamLength = useSelector((state) => state.poke.team.length);
    const team = useSelector((state) => state.poke.team);
    const handleOpen = () => {
        dispatch(setOpen(true));
        dispatch(showPokemon());
    };

    const handleClose = (param) => {
        dispatch(setOpen(false));
            searchHandlerACB(param)
    };
    const handleClick = (param) => {
        console.log("Clicked Pokémon: ", param);
        searchHandlerACB(param)
    };
    function searchHandlerACB(param) { dispatch(doPokeThunk(param)); }
    return  <SearchView open = {open} 
                        options = {showPokemonPromiseState.data} 
                        loading = {loading} 
                        handleOpen ={handleOpen} 
                        handleClose ={handleClose} 
                        team={team}
                        teamLength={teamLength} 
                        handleClick={handleClick}
            />
}