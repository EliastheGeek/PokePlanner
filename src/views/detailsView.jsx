import "/src/style.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { display } from "@smogon/calc/dist/desc";
const Input = styled(MuiInput)`width: 42px;`;


export function DetailsView(props) {

    const { pokemon, pokemonIndex, team, onNext, onPrevious } = props;

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

    const maxEV = 252;

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
          onClick={onPrevious} 
          disabled={pokemonIndex<=0}
          >Previous
        </button>
        
        <button 
          className="nextPokeBtn" 
          onClick={onNext} 
          disabled={pokemonIndex >= Math.min(6, props.team.length - 1)}
          >Next
        </button>
        </Box>
        <Box>
        {printStats()}
        </Box>
    </div>
    );

    function printStats() {
      return ( 
        <div>
          {!pokemon ? (
            <div>No Pokémon selected</div>
          ) : ( 
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
            <Box sx={{ display: "flex" }}> 
              <h2>{props.team[pokemonIndex].name}</h2>
              <img src={props.team[pokemonIndex].sprites?.front_default} width={150}/>
            </Box>
            <Box sx={{ display: "flex" }}>
              <div> 
                  <aside>
                  <h3>Stats:</h3>
                  <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                      {props.team[pokemonIndex].stats?.map(printBaseStatsCB)}
                  </ul>
                  </aside>
              </div>

              <div>
                  <h3>Tera Type:</h3>
                      <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                          {props.team[pokemonIndex].types?.map(printTeraTypesCB)}
                      </ul>    
              </div>
            </Box>
            <Box sx={{ display: "flex" }}> 
                {MoveList(0,pokemonIndex)}    
                {MoveList(1,pokemonIndex)}
                {MoveList(2,pokemonIndex)}
                {MoveList(3,pokemonIndex)}
                {AbilityList(pokemonIndex)}
            </Box>
          </Box>)}
        </div>
      );

      }
    
    function printBaseStatsCB(stats) {
        return <li key={stats.stat.name}>{stats.base_stat +" + " + (stats.bonusStats?stats.bonusStats:0)+ " " + stats.stat.name} 
                       {InputSlider(stats.stat.name)}</li>;
    }
    function printTeraTypesCB(types) {
        return <li key={types.type.name}>{types.type.name}</li>;
    }
    function MoveInfo(slot, index){
      const moveData = props.team[index]?.moveInfo[slot];
      if (moveData===null) return <div>No move info loaded</div>;
      return (
        <div>
          <h3>Move Info:</h3>
          <p>{moveData.name}</p>
          <p>Power: {moveData.power}</p>
          <p>Accuracy: {moveData.accuracy}</p>
          <p>Type: {moveData.type?.name}</p>
          <p>Damage type: {moveData.damage_class?.name}</p>
          <p>PP: {moveData.pp}</p>
        </div>
      );
    }


//addToMoveListACB får details sidan att byta vy till index 0 när man lägger till ett move
function MoveList(slot,index) {
  function addToMoveListACB(evt){
    props.addMove(evt.target.innerText, slot, index);
  }

 return (
  <div>
    <Autocomplete
      id="move-select"
      sx={{ width: 200 }}
  
      options={props.team[index]?.moves || []}
      /*getOptionDisabled={(option) =>
      option === props.team[index]?.moves[slot] }*/
      autoHighlight

      onChange={addToMoveListACB}
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
    {MoveInfo(slot, index)} </div>
  );
}
function AbilityList(index) {
function addToAbilityListACB(evt){
  props.setAbility(evt.target.innerText, index);
}
  return (
    <div> 
    <Autocomplete
      id="ability-select"
      sx={{ width: 200 }}
      options={pokemon?.abilities ?? []}
      autoHighlight
      onChange={addToAbilityListACB}
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
    <div>Chosen ability: {pokemon?.abilities?.find(ab => ab.chosen)?.ability?.name||<div>None</div>}</div>
    </div>
  );
}



function InputSlider(statName) {
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.evChange(newValue,statName,pokemonIndex);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > maxEV) {
      setValue(maxEV);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        EV
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size="grow">
          <Slider
          defaultValue={0}
            min={0}
            max={maxEV}
            step={6}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: maxEV,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

}