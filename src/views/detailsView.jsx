import "/src/style.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import pokeSilhouetteMini from "/src/assets/pokesilhouetteMini.png";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { display } from "@smogon/calc/dist/desc";

import CircularProgress from '@mui/material/CircularProgress';
import { render } from "katex";

const Input = styled(MuiInput)`width: 42px;`;


export function DetailsView(props) {

    const { pokemon, pokemonIndex, team, onNext, onPrevious } = props;

    function backToTeamACB(){
        window.location.hash = "#/team";
    }

    const maxEV = 252;

    return (
    <div className="detailsNavigationBox">
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
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button className="backToTeamViewBtn" onClick={backToTeamACB}>Back to team builder</Button>
          <Button className="prevPokeBtn" onClick={onPrevious} disabled={pokemonIndex<=0}>
            <img src={props.team[pokemonIndex-1]?.sprites?.front_default ?? pokeSilhouetteMini}/>Previous</Button>
          <Button className="nextPokeBtn" onClick={onNext} disabled={pokemonIndex >= Math.min(6, props.team.length - 1)}>
            Next<img src={props.team[pokemonIndex+1]?.sprites?.front_default ?? pokeSilhouetteMini}/></Button>
        </ButtonGroup>
        
        </Box>
        <Box>
        {printStats()}
        </Box>
    </div>
    );

  function printStats() {
      if (!props.team || !pokemon) return null;
     return ( 
          <Box sx={{display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "start",}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <h2 style={{ margin: 0 }}>{pokemon.name}</h2>
              <img
                src={pokemon.sprites?.front_default}
                width={150}
                alt={pokemon.name}
              />
            </Box>

            <Box sx={{display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", alignItems: "start",}}>
              <Box component="aside">
                <h3>Stats:</h3>
                <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                  {pokemon.stats?.map(printBaseStatsCB)}
                </ul>
              </Box>

              <Box>
                <h3>Type:</h3>
                <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                  {pokemon.types?.map(printTypesCB)}
                </ul>
              </Box>
            </Box>

            <Box sx={{gridColumn: "1 / -1", display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", alignItems: "start",}}>
              {MoveList(0, pokemonIndex)}
              {MoveList(1, pokemonIndex)}
              {MoveList(2, pokemonIndex)}
              {MoveList(3, pokemonIndex)}
              {AbilityList(pokemonIndex)}
              {SearchItem()}
            </Box>
          </Box>
        );
  }
    
    function printBaseStatsCB(stats) {
        return <li key={stats.stat.name}>{stats.base_stat +" + " + (stats.bonusStats?stats.bonusStats:0)+ " " + stats.stat.name} 
                       {InputSlider(stats.stat.name)}</li>;
    }

    function printTypesCB(types) {
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
    <div>Chosen ability: {pokemon?.abilities?.find(ab => ab.chosen)?.ability?.name}</div>
    <div>Description: {pokemon?.abilities?.find(ab => ab.chosen)?.description||<div>No ability chosen</div>}</div>
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
            readOnly={true}            
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

function renderSelectedItem(pokemonIndex) {
    const selectedItem = props.team[pokemonIndex]?.held_item;
    if (!selectedItem) {
      return <div>No item selected</div>;
    } else {
      return (
        <div><h3>Selected Item:</h3>
          <div><p>{selectedItem.name}</p><img src={selectedItem.sprites?.default} alt={selectedItem.name} width={50}/></div>
          <p>{selectedItem.effect_entries[0]?.effect || 'No description available'}</p>
        </div>
      );
    }
}
function SearchItem() {

  return (
    <div className="searchWrapper">
      <Autocomplete
        sx={{ width: 200 }}
        open={props.open}
        onOpen={props.handleOpen}
        onClose={props.handleClose}

        onChange={(event, option) => {
          if (option) {
            props.onItemSelect(option,pokemonIndex);
          }
        }}

        isOptionEqualToValue={(option, value) => 
          option.id === value.id
        }
        getOptionLabel={(option) => option.name}
        options={props.options}
        loading={props.loading}

        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Item"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {props.loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              },
            }}
          />
        )}
      />
      {renderSelectedItem(pokemonIndex)}
    </div>
  );
}

}