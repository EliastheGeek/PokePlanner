import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { formatPokeName } from "/src/utilities.js";

export function SearchView(props) {
  return (
    <div className="searchWrapper">
      <Autocomplete
        sx={{ width: 300, size:200 }}
        open={props.open}
        onOpen={props.handleOpen}
        onClose={props.handleClose}

        onChange={(event, option) => {
          if (option) {
            props.onSelectPokemon(option);
          }
        }}

        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => formatPokeName(option.name)}
        options={props.options}
        loading={props.loading}
        disabled={props.teamLength >= 6}


        renderOption={(liProps, option) => {
          const { key, ...restProps } = liProps;
          return (
            <li key={key} {...restProps}>
              {formatPokeName(option?.name)}
            </li>
          );
        }}


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