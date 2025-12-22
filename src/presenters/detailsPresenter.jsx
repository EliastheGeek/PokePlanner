import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsView } from "/src/views/detailsView.jsx";
import { removeMove, removeAbility, addActualMove, setOpen, setNatureOpen, setCurrentPokemon, setEVstat, setIVstat, setAbility, setNature, setLevel, showItems, showNatures } from "/src/reduxStore.js";
import { doMoveThunk, doAbilityThunk, doItemThunk, doNatureThunk } from "/src/store/searchThunks.js";



export function Details() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.poke.loading);
    const open = useSelector((state) => state.poke.open);
    const team = useSelector((state) => state.poke.team);
    const currentPokemonName = useSelector((state) => state.poke.currentPokemonName);
    const pokemonIndex = team.findIndex(p => p?.name === currentPokemonName);
    const showItemsPromiseState = useSelector((state) => state.poke.showItemsPromiseState);
    const showNaturesPromiseState = useSelector((state) => state.poke.showNaturesPromiseState);
    const pokemon = pokemonIndex >= 0 ? team[pokemonIndex] : null;
    const { name } = useParams();

    useEffect(() => {
        // If the route contains a pokemon name, make it the current pokemon
        if (!name) return;
        if (currentPokemonName !== name) {
            dispatch(setCurrentPokemon(name));
        }
    }, [name, currentPokemonName, dispatch]);

     const handleOpen = () => {
        dispatch(setOpen(true));
        dispatch(showItems());
    };
    const handleOpenNature = ()=>{
        dispatch(setNatureOpen(true));
         dispatch(showNatures());
    }
    const handleClose = (param) => {dispatch(setOpen(false));};

    function nextPokemonACB() {
        if (pokemonIndex < 0) return;

        const nextIndex = pokemonIndex + 1;
        if (nextIndex >= team.length) return;

        dispatch(setCurrentPokemon(team[nextIndex].name));
        navigate(`/details/${team[nextIndex].name}`);
    }

    function previousPokemonACB() {
        if (pokemonIndex < 0) return;

        const prevIndex = pokemonIndex - 1;
        if (prevIndex < 0) return;

        dispatch(setCurrentPokemon(team[prevIndex].name));
        navigate(`/details/${team[prevIndex].name}`);
    }
        
    function addActualMoveACB(moveName, slot, pokemonIndex){
        const moveNSlot = {moveName:moveName, slot:slot, pokemonIndex:pokemonIndex}; 
        dispatch(addActualMove(moveNSlot))
        dispatch(doMoveThunk(moveNSlot))
    }

    function evChangeACB(newValue, statName, pokemonIndex){
        const evChangeInfo = {newValue:newValue, statName:statName, pokemonIndex:pokemonIndex};
        dispatch(setEVstat(evChangeInfo));
    }
    function ivChangeACB(newValue, statName, pokemonIndex){
        const ivChangeInfo = {newValue:newValue, statName:statName, pokemonIndex:pokemonIndex};
        dispatch(setIVstat(ivChangeInfo));
    }
    function setAbilityACB(abilityName, pokemonIndex){
        const abilityInfo = {abilityName:abilityName, pokemonIndex:pokemonIndex};
        dispatch(doAbilityThunk(abilityInfo));
    }
    function setItemACB(item, pokemonIndex){
        const itemInfo = {itemName:item.name, pokemonIndex:pokemonIndex};
        dispatch(doItemThunk(itemInfo));
        dispatch(setOpen(false))
    }
    function setLevelACB(level, pokemonIndex){
        const levelInfo = {level:level, pokemonIndex:pokemonIndex}
        dispatch(setLevel(levelInfo));
    }
    function setNatureACB(natureName, pokemonIndex){
        const natureInfo ={natureName:natureName, pokemonIndex:pokemonIndex}
        dispatch(doNatureThunk(natureInfo));
    }
    function clearMoveACB(slot, pokemonIndex){
        dispatch(removeMove({ slot, pokemonIndex }));
    }
    function clearAbilityACB(pokemonIndex){
        dispatch(removeAbility({ pokemonIndex }));
    }

    useEffect(() => {
        if (team.length === 0) return;

        // Only default to the first team pokemon when there is no name in the route
        if (pokemonIndex === -1 && !name) {
            dispatch(setCurrentPokemon(team[0].name));
        }
    }, [team, pokemonIndex, dispatch, name]);


    return <DetailsView team={team} 
                        handleOpen={handleOpen}
                        handleOpenNature={handleOpenNature}
                        handleClose={handleClose}
                        open={open}
                        loading={loading}
                        options={showItemsPromiseState.data}
                        optionsNature={showNaturesPromiseState.data}
                        pokemon={pokemon}
                        pokemonIndex={pokemonIndex}
                        onNext={nextPokemonACB}
                        onPrevious={previousPokemonACB}
                        addMove={addActualMoveACB}
                        clearMove={clearMoveACB}
                        evChange={evChangeACB}
                        setAbility={setAbilityACB}
                        clearAbility={clearAbilityACB}
                        setNature={setNatureACB}
                        onItemSelect={setItemACB}
                        ivChange={ivChangeACB}
                        setLevel={setLevelACB}/>;
};