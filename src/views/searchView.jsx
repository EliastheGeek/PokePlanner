import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export function SearchView(props) {
  function closeEventACB(evt){
    console.log(evt.target.value);
    if(evt.target.value!=0) { props.handleClose(evt.target.value);}
  }
  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={props.open}
      onOpen={props.handleOpen}
      onClose={closeEventACB}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={props.options}
      loading={props.loading}
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
  );
}