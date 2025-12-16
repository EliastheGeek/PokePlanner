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
    const searchResultsPromiseState = useSelector((state) => state.poke.searchResultsPromiseState);
    const handleOpen = () => {
        dispatch(setOpen(true));
        dispatch(showPokemon());
    };

    const handleClose = (param) => {
        console.log("Selected Pokémon: ", param);
        dispatch(setOpen(false));
        if(param!=0)
            searchHandlerACB(param)

    };
    function searchHandlerACB(param) { dispatch(doPokeThunk(param)); }
    function addPokemonToTeamACB(param){ dispatch(addToTeam(searchResultsPromiseState?.data)); }
    return  <SearchView open = {open} 
                        options = {showPokemonPromiseState.data} 
                        loading = {loading} 
                        handleOpen ={handleOpen} 
                        handleClose ={handleClose} 
            />
}