import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { DetailsView } from "/src/views/detailsView.jsx";
import { addActualMove, setOpen, setNatureOpen, setCurrentPokemon, setEVstat, setIVstat, setAbility, setNature, setLevel, showItems, showNatures } from "/src/reduxStore.js";
import { doMoveThunk, doAbilityThunk, doItemThunk, doNatureThunk } from "/src/store/searchThunks.js";



export function Details() {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.poke.loading);
    const open = useSelector((state) => state.poke.open);
    const team = useSelector((state) => state.poke.team);
    const currentPokemonName = useSelector((state) => state.poke.currentPokemonName);
    const pokemonIndex = team.findIndex(p => p?.name === currentPokemonName);
    const showItemsPromiseState = useSelector((state) => state.poke.showItemsPromiseState);
    const showNaturesPromiseState = useSelector((state) => state.poke.showNaturesPromiseState);
    const pokemon = pokemonIndex >= 0 ? team[pokemonIndex] : null;

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
    }

    function previousPokemonACB() {
        if (pokemonIndex < 0) return;

        const prevIndex = pokemonIndex - 1;
        if (prevIndex < 0) return;

        dispatch(setCurrentPokemon(team[prevIndex].name));
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

    useEffect(() => {
        if (team.length === 0) return;

        if (pokemonIndex === -1) {
            dispatch(setCurrentPokemon(team[0].name));
        }
    }, [team, pokemonIndex, dispatch]);


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
                        evChange={evChangeACB}
                        setAbility={setAbilityACB}
                        setNature={setNatureACB}
                        onItemSelect={setItemACB}
                        ivChange={ivChangeACB}
                        setLevel={setLevelACB}/>;
};