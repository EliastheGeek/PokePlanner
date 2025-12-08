import { useSelector, useDispatch } from "react-redux";
import {SearchView} from "/src/views/searchView.jsx"
import {setOpen, showPokemon} from "/src/reduxStore.js"

export function Search() {
    const dispatch = useDispatch();

    const open = useSelector((state) => state.poke.open);
    const loading = useSelector((state) => state.poke.loading);
    const showPokemonPromiseState = useSelector((state) => state.poke.showPokemonPromiseState);
     
    const handleOpen = () => {
        dispatch(setOpen(true));
        dispatch(showPokemon());
    };

    const handleClose = () => {
        dispatch(setOpen(false));
        dispatch(setOptions([]));
    };

    return  <SearchView open = {open} 
                        options = {showPokemonPromiseState.data} 
                        loading = {loading} 
                        handleOpen ={handleOpen} 
                        handleClose ={handleClose} 
            />
}