import "/src/style.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect } from "react";

export function DetailsView(props) {

    function backToTeamACB(){
        window.location.hash = "#/team";
    }

    function previousPokemonACB(){
      setPokemonIndex(prev => {
        if (prev <= 0) return prev;
        const newIndex = prev - 1;
        console.log("Previous index: ", newIndex);
        return newIndex;
      });
    }
    
    function nextPokemonACB(){
      setPokemonIndex(prev => {
        const maxIndex = Math.min(6, props.team.length - 1);
        if (prev >= maxIndex) return prev;
        const newIndex = prev + 1;
        console.log("Next index: ", newIndex);
        return newIndex;
      });
    }

    const initialIndex = props.team.findIndex(
      function findOneCB(team){
        return props.currentPokemonName === team.name;
      }
    );

    const [pokemonIndex, setPokemonIndex] = useState(
      initialIndex >= 0 ? initialIndex : 0
    );

    const pokemon = props.team?.[pokemonIndex];

    return (
    <div>
      <Box
          sx={{
            flex: 1,
            borderLeft: "1px solid #e0e0e0",
            pl: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >

        <button 
          className="backToTeamViewBtn"
          onClick={backToTeamACB}
          >Back to team builder
        </button>

        <button 
          className="prevPokeBtn"
          onClick={previousPokemonACB} 
          disabled={pokemonIndex<=0}
          >Previous
        </button>
        
        <button 
          className="nextPokeBtn" 
          onClick={nextPokemonACB} 
          disabled={pokemonIndex >= Math.min(6, props.team.length - 1)}
          >Next
        </button>

        {printStats()}
        {MoveList(0)}
        {MoveList(1)}
        {MoveList(2)}
        {MoveList(3)}
        {AbilityList()}
        </Box>
    </div>
    );

    function printStats() {

      if (!pokemon) return null;

      return ( 
        <div>
          <header>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites?.front_default}/>
          </header>

          <aside>
            <h3>Stats:</h3>
            <ul>
              {pokemon.stats?.map(printBaseStatsCB)}
            </ul>
          </aside>

          <div>
            <h3>Tera Type:</h3>
              <ul>
                  {pokemon.types?.map(printTeraTypesCB)}
              </ul>
          </div>

        </div>);
      }
    
    function printBaseStatsCB(stats) {
        return <li key={stats.stat.name}>{stats.base_stat+" "+stats.stat.name}</li>;
    }
    function printTeraTypesCB(types) {
        return <li key={types.type.name}>{types.type.name}</li>;
    }


//TODO, lista ut hur man får ut värdet man väljer från movelist 

function MoveList(slot) {

  function addToMoveListCB(evt, value){ 
    console.log("Selected move: ", value);
    props.addMove(value, slot);
  }
  
  return (
    <Autocomplete
      id="move-select"
      sx={{ width: 200 }}
      options={pokemon?.actualMoves?.[slot] ?? pokemon?.moves ?? []}
      autoHighlight
      getOptionLabel={(option) => option.move?.name || ""}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.move?.name}
          </Box>
        );
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          label="Move"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}
function AbilityList() {

  return (
    <Autocomplete
      id="ability-select"
      sx={{ width: 200 }}
      options={pokemon?.abilities ?? []}
      autoHighlight
      getOptionLabel={(option) => option.ability?.name || ""}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.ability?.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ability"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}
}