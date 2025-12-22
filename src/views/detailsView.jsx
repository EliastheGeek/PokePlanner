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
import { formatPokeName } from "/src/utilities.js"
import CircularProgress from '@mui/material/CircularProgress';
import { calcStatFromBase } from "@/utilities";

const Input = styled(MuiInput)`width: 42px;`;

export function DetailsView(props) {

    const { pokemon, pokemonIndex, team, onNext, onPrevious } = props;

    function backToTeamACB(){
        window.location.hash = "#/team";
    }

    const maxEV = 252;
    const maxIV = 31;
    const maxLevel = 100;
    const teamMax = 6;
    return (
      <div className="detailsNavigationBox">
        <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
          <ButtonGroup 
              variant="outlined" 
              aria-label="Basic button group"
              className="detailsNavBtnGroup"
          >
            <Button 
                className="navBtn backBtn" 
                onClick={backToTeamACB}>
                  ← Back to team builder
            </Button>
            
            <Button 
                className="navBtn prevBtn" 
                onClick={onPrevious} 
                disabled={pokemonIndex<=0}
            >
              <span className="arrow">←</span>
              <img 
                className="navThumb"
                src={props.team[pokemonIndex-1]?.sprites?.front_default ?? pokeSilhouetteMini}
                alt=""
                />
                Previous
            </Button>

            <Button 
                className="navBtn nextBtn" 
                onClick={onNext} 
                disabled={pokemonIndex >= Math.min(6, props.team.length - 1)}
            >
              Next
              <img 
                className="navThumb"
                src={props.team[pokemonIndex+1]?.sprites?.front_default ?? pokeSilhouetteMini}
                alt=""
              />
              <span className="arrow">→</span>
            </Button>
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
          <Box className="detailsGrid"
              sx={{
                display: "grid",
                gap: 12,
                alignItems: "start",
              }}
          >
            <Box className="detailsColumn1">
              <Box className="detailsTitleImage">
                <Typography className="detailsHeader" variant="h5">
                  {formatPokeName(pokemon.name)}
                </Typography>

                <img
                  className="detailsMainImage"
                  src={pokemon?.sprites?.front_home}
                  alt={formatPokeName(pokemon.name)}
                />
              </Box>

              <Box className="detailsTypeLevel">
                  <h3>Type:</h3>
                  <ul className="typeList">
                    {pokemon.types?.map(printTypesCB)}
                  </ul>
                  <div className="levelSelector">
                    <label className="levelLabel">Level</label>
                    {LevelInput(pokemon)}
                  </div>
              </Box>
            </Box>

            <Box className="detailsColumn2">
              <Box className="detailsStats"
                  component="aside">
                <ul style={{ paddingLeft: 0, lineHeight: 1.5 }}>
                  {pokemon.stats?.map(printBaseStatsCB)}
                </ul>
              </Box>
              {SearchItem()}
            </Box>
            
            <Box className="detailsColumn3">
              {MoveList(0, pokemonIndex)}
              {MoveList(1, pokemonIndex)}
              {MoveList(2, pokemonIndex)}
              {MoveList(3, pokemonIndex)}
              {AbilityList(pokemonIndex)}
              {NatureList(pokemonIndex)}
            </Box>
          
          </Box>
      );
  

  function NatureList(index){

    function natureChangeACB(event){
      props.setNature(event.target.innerText, index);
    }

    const natureInfo = props.team[index]?.natureInfo || null;

    const selectedNature =
      natureInfo
        ? props.optionsNature.find(n => n.name === natureInfo.name) || null
        : null;

    return (
      <div className="selectInfoWrapper">

        <div className="selectBox">
          <Autocomplete
            key={`nature-${index}`}
            id="nature-select"
            sx={{ width: 200 }}
            options={props.optionsNature ?? []}
            value={selectedNature}
            autoHighlight
            onChange={natureChangeACB}
            getOptionLabel={(option) =>
              option?.name ? formatPokeName(option.name) : ""
            }
            isOptionEqualToValue={(opt, val) =>
              opt?.name === val?.name
            }
            renderOption={(liProps, option) => {
              if (!option?.name) return null;
              const { key, ...optionProps } = liProps;
              return (
                <Box key={key} component="li" {...optionProps}>
                  {formatPokeName(option.name)}
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
                    autoComplete: "new-password",
                  },
                }}
              />
            )}
          />
        </div>

        <div className="infoBox">
          {
            <>
              <div className="infoTitle">
                {formatPokeName(natureInfo?.name)}
              </div>
              <div className="infoText">
                Decreased stat: {formatPokeName(natureInfo?.decrease || "none")}
              </div>
              <div className="infoText">
                Increased stat: {formatPokeName(natureInfo?.increase || "none")}
              </div>
            </>}
        </div>

      </div>
    );}

  function showNatures(index){

    const natureInfo = props.team[index].natureInfo;
    const none = "none"
    if (!natureInfo) return;
    return(
      <div>
          <p>{formatPokeName(natureInfo.name)}</p>
          <p>Decreased stat: {formatPokeName(natureInfo.decrease||none)}</p>
          <p>Increased stat: {formatPokeName(natureInfo.increase||none)}</p>
          </div>
    );
  }
    
    function printBaseStatsCB(stats) { //nature saknas
      if(stats?.stat.name ==='hp'){
        var total = calcStatFromBase({base:stats.base_stat,
                                  iv:stats.IV_Value, 
                                  ev:stats.EV_Value, 
                                  level:pokemon.level, 
                                  natureMult:stats.natureModifier, 
                                  isHP:true
                                })
      }
      else{
        var total = calcStatFromBase({base:stats.base_stat,
                                  iv:stats.IV_Value, 
                                  ev:stats.EV_Value, 
                                  level:pokemon.level, 
                                  natureMult:stats.natureModifier, 
                                  isHP:false
                                })
      }
      return (
        <li key={stats.stat.name} className="statRow">
          {total}{" "}
          {formatPokeName(stats.stat.name)}

          <div className="statControls">
            {InputSlider(stats.stat.name)}

            <div className="ivBlock">
              {IVInput(stats.stat.name)}
              <div className="ivLabel">IV</div>
            </div>
          </div>
        </li>
      ); }
  }

  function printTypesCB(types) {
    return <li key={types.type.name}> <img src={`/src/assets/typeIcons/${types.type.name}.png`} width={112} style={{ paddingBottom: 3 }} /> </li>;
  }

  function MoveInfo(slot, index){
    const moveData = props.team[index]?.moveInfo[slot];
    if (moveData===null) return;
    return (
      <div>
        <p>{formatPokeName(moveData.name)}</p>
        <p>Power: {moveData.power}</p>
        <p>Accuracy: {moveData.accuracy}</p>
        <p className="moveInfoTypeLine">
          Type: 
          <img className="moveTypeIcon" 
              src={`/src/assets/typeIcons/${moveData.type?.name}.png`}
          />
        </p>
        <p>Damage type: {formatPokeName(moveData.damage_class?.name)}</p>
        <p>PP: {moveData.pp}</p>
      </div>
    );
  }

  //addToMoveListACB får details sidan att byta vy till index 0 när man lägger till ett move
  function MoveList(slot,index) {

    function addToMoveListACB(evt, option){
      if (!option) {
        props.clearMove(slot, index);
        return;
      }
      props.addMove(option.move.name, slot, index);
    }

    return (
      <div className="moveListWrapper">
        <div className="moveSelect">
          <Autocomplete
            key={`move-${slot}-${index}`}
            id="move-select"
            sx={{ width: 200 }}
            options={props.team[index]?.moves || []}
            autoHighlight
            onChange={addToMoveListACB}
            getOptionLabel={(option) => formatPokeName(option.move?.name) || ""}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li" {...optionProps}>
                  {formatPokeName(option.move?.name)}
                </Box>
              );
            }}
            renderInput={(params) => (<TextField {...params} label="Move"/>)}
          />
        </div>
    
        <div className="moveInfoWrapper">
          {MoveInfo(slot, index)}
        </div>
      </div>
    );
  }

  function AbilityList(index) {

    function addToAbilityListACB(evt, option){
      if (!option) {
        props.clearAbility(index);
        return;
      }
      props.setAbility(option.ability.name, index);
    }

    const chosenAbility = pokemon?.abilities?.find(ab => ab.chosen) || null;

    return (
      <div className="selectInfoWrapper">

      <div className="selectBox">
        <Autocomplete
          key={`ability-${index}`}
          id="ability-select"
          sx={{ width: 200 }}
          value={chosenAbility}
          options={pokemon?.abilities ?? []}
          autoHighlight
          onChange={addToAbilityListACB}
          getOptionLabel={(option) =>
            option?.ability?.name
              ? formatPokeName(option.ability.name)
              : ""
          }
          isOptionEqualToValue={(opt, val) =>
            opt?.ability?.name === val?.ability?.name
          }
          renderOption={(props, option) => {
            if (!option?.ability?.name) return null;
            const { key, ...optionProps } = props;
            return (
              <Box key={key} component="li" {...optionProps}>
                {formatPokeName(option.ability.name)}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Ability" />
          )}
        />
      </div>
      
      <div className="infoBox">
        {pokemon.abilityInfo ? (
          <>
            <div className="infoTitle">
              {formatPokeName(pokemon.abilityInfo.name)}
            </div>
            <div className="infoText">
              {pokemon.abilityInfo.description}
            </div>
          </>
        ) : (
          <div className="infoText muted">
            No ability info loaded
          </div>
        )}
      </div>

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
          </Grid>);
  }

  function LevelInput(pokemon){
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
    const initialEV = props.team[pokemonIndex]?.stats?.find(s => s.stat.name === statName)?.EV_Value ?? 0;
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
        return;
      } else {
        return (
          <div>
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