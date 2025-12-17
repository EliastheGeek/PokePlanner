import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export function SearchView(props) {
  function closeEventACB(evt){
    if(evt.target.value!=0) { props.handleClose(evt.target.value);}
  }
  function clickEventACB(evt){
    if(evt.target.value!=0) { props.handleClick(evt.target.value);}
  }
  return (
    <div className="searchWrapper">
      <Autocomplete
        sx={{ width: 300 }}
        open={props.open}
        onOpen={props.handleOpen}
        onClose={closeEventACB}
        onClick={clickEventACB}
        onInputChange={clickEventACB}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={props.options}
        loading={props.loading}
        disabled={props.teamLength >= 6}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Pokémon"
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
    </div>
  );
}