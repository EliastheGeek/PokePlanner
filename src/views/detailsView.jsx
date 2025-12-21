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
import { formatPokeName } from "/src/utilities.js"
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
              
              <h2 style={{ margin: 0 }}>{formatPokeName(pokemon.name)} Level: {LevelInput()}</h2>
              
              <img
                src={pokemon?.sprites?.other?.home?.front_default}
                width={150}
                alt={formatPokeName(pokemon.name)}
                
              />
              
              <Box>          
                <h3>Type:</h3>
                <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                  {pokemon.types?.map(printTypesCB)}
                </ul>
      
                  <Box component="aside">
                    <h3>Stats:</h3>
                    <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                    {pokemon.stats?.map(printBaseStatsCB)}
                    </ul>
                  </Box>
              {SearchItem()}
              </Box>
              {MoveList(0, pokemonIndex)}
              {MoveList(1, pokemonIndex)}
              {MoveList(2, pokemonIndex)}
              {MoveList(3, pokemonIndex)}
              
              <Box>{AbilityList(pokemonIndex)}{NatureList(pokemonIndex)}</Box>
            </Box>


            <Box sx={{display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", alignItems: "start",}}>
              


   
            
            </Box>

              
            <Box sx={{gridColumn: "1 / -1", display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", alignItems: "start",}}>

              
              
            </Box>
          
          </Box>
        );
  }
  function NatureList(index){
    function natureChangeACB(event){
      props.setNature(event.target.innerText, index);
    }
    return(
    <div>
    <Autocomplete
      key={`nature-${index}`}
      id="nature-select"      
      onOpen={props.handleOpenNature}
      onClose={props.handleClose}        
      sx={{ width: 200 }}
      options={props.optionsNature}
      autoHighlight

      onChange={natureChangeACB}
      getOptionLabel={(option) => option.name || ""}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
          
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {formatPokeName(option?.name)}
          </Box>
        

        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Nature"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
          
    />
    {showNatures(pokemonIndex)}
    </div>
    );}
  function showNatures(index){
    const natureInfo = props.team[index].natureInfo;
    const none = "none"
    if (!natureInfo) return <div>No nature chosen</div>;
    return(
      <div>
          <h3>Nature Info:</h3>
          <p>{formatPokeName(natureInfo.name)}</p>
          <p>Decreased stat: {formatPokeName(natureInfo.decrease||none)}</p>
          <p>Increased stat: {formatPokeName(natureInfo.increase||none)}</p>
          </div>
    );
  }
    
    function printBaseStatsCB(stats) { //nature saknas
      function calculateTotalStat(stats) {
        if(stats?.stat.name ==='hp'){
          const total = Math.floor(((2 * stats.base_stat + stats.IV_Value + stats.EV_Value/4)*pokemon.level)/100) + 10+pokemon.level;
          return total;
        }
        const total = Math.floor(((((2 * stats.base_stat + stats.EV_Value/4 + stats.IV_Value)*pokemon.level)/100) + 5)*stats.natureModifier);
        return total;
      }
        return <li key={stats.stat.name}>{(calculateTotalStat(stats)||stats.base_stat)  + " " + formatPokeName(stats.stat.name)} 
                       {InputSlider(stats.stat.name)}{IVInput(stats.stat.name)}</li>;
    }

    function printTypesCB(types) {
        return <li key={types.type.name}> <img src={`/src/assets/typeIcons/${types.type.name}.png`} width={112} style={{ paddingBottom: 3 }} /> </li>;
    }

    function MoveInfo(slot, index){
      const moveData = props.team[index]?.moveInfo[slot];
      if (moveData===null) return <div>No move info loaded</div>;
      return (
        <div>
          <h3>Move Info:</h3>
          <p>{formatPokeName(moveData.name)}</p>
          <p>Power: {moveData.power}</p>
          <p>Accuracy: {moveData.accuracy}</p>
          <p style={{ display: "flex", alignItems: "center" }}>Type: <img style={{ marginLeft: "4px" }} src={`/src/assets/typeIcons/${moveData.type?.name}.png`} width={84} /></p>
          <p>Damage type: {formatPokeName(moveData.damage_class?.name)}</p>
          <p>PP: {moveData.pp}</p>
        </div>
      );
    }


//addToMoveListACB får details sidan att byta vy till index 0 när man lägger till ett move
function MoveList(slot,index) {

  function addToMoveListACB(evt, option){
    if (!option) return; 
    props.addMove(option.move.name, slot, index);
  }

 return (
  <div>
    <Autocomplete
      key={`move-${slot}-${index}`}
      id="move-select"              
      sx={{ width: 200 }}
  
      options={props.team[index]?.moves || []}
      /*getOptionDisabled={(option) =>
      option === props.team[index]?.moves[slot] }*/
      autoHighlight

      onChange={addToMoveListACB}
      getOptionLabel={(option) => formatPokeName(option.move?.name) || ""}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (

          <Box          
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {formatPokeName(option.move?.name)}
          </Box>
        );
      }}
      renderInput={(params) => (<TextField {...params} label="Move"/>)}
    />
    {MoveInfo(slot, index)} </div>
  );
}

function AbilityList(index) {

  function addToAbilityListACB(evt, option){
    if (!option) return; 
    props.setAbility(option.ability.name, index);
  }
  return (
    <div> 
    <Autocomplete
      key={`ability-${index}`}
      id="ability-select"
      sx={{ width: 200 }}
      options={pokemon?.abilities ?? []}
      autoHighlight
      onChange={addToAbilityListACB}
      getOptionLabel={(option) => formatPokeName(option.ability?.name) || ""}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {formatPokeName(option.ability?.name)}
          </Box>
        );
      }}
      renderInput={(params) => ( <TextField {...params} label="Ability"/> )}
    />
    <div>Chosen ability: {formatPokeName(pokemon?.abilities?.find(ab => ab.chosen)?.ability?.name)}</div>
    <div>Description: {pokemon?.abilities?.find(ab => ab.chosen)?.description||<div>No ability chosen</div>}</div>
    </div>
  );
}

function IVInput(statName){
  const initialIV = pokemon?.stats?.find(s => s.stat.name === statName)?.IV_Value ?? 0;
  const [value, setValue] = React.useState(initialIV);

  React.useEffect(() => {
    const iv = pokemon?.stats?.find(s => s.stat.name === statName)?.IV_Value ?? 0;
    setValue(iv);
  }, [pokemonIndex, statName, pokemon]);

  const handleInputChange = (event) => {
    if(event.target.value>31) return;
    setValue(event.target.value === '' ? 0 : Number(event.target.value));

    props.ivChange(event.target.value === '' ? 0 : Number(event.target.value), statName, pokemonIndex);
  };
    const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 31) {
      setValue(31);
    }
  };
  return (<Grid>
    
          <Input
            value={value}
            size="small"          
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 31,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          IV
        </Grid>);
}
function LevelInput(){
  const initialLevel = pokemon?.level ?? 1;
  const [value, setValue] = React.useState(initialLevel);

  React.useEffect(() => {
    setValue(pokemon?.level ?? 1);
  }, [pokemonIndex, pokemon]);

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 1 : Number(event.target.value));

    props.setLevel(event.target.value === '' ? 1 : Number(event.target.value), pokemonIndex);
  };
    const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 100) {
      setValue(100);
    }
  };
  return (<Grid>
    
          <Input
            value={value}
            size="small"          
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />

        </Grid>);
}

function InputSlider(statName) {
  const initialEV = pokemon?.stats?.find(s => s.stat.name === statName)?.EV_Value ?? 0;
  const [value, setValue] = React.useState(initialEV);

  React.useEffect(() => {
    const ev = pokemon?.stats?.find(s => s.stat.name === statName)?.EV_Value ?? 0;
    setValue(ev);
  }, [pokemonIndex, statName, pokemon]);

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
          <div><p>{formatPokeName(selectedItem.name)}</p><img src={selectedItem.sprites?.default} alt={selectedItem.name} width={50}/></div>
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
        getOptionLabel={(option) => formatPokeName(option?.name)}
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