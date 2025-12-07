import "/src/style.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
export function DetailsView(props) {//skicka in en pokemon singular
    function backToTeamACB(){
        window.location.hash = "#/team";
    }
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
        <button className="pokeBotBox" onClick={backToTeamACB}>Back to team builder</button>
        <header>
            
            
            <h2>{props.pokemon.name}</h2>
            <img src={props.pokemon.sprites?.front_default}/>
        </header>
        <div>
            <div>
                
                <aside>
                <h3>Stats:</h3>
                <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                    {props.pokemon.stats?.map(printBaseStatsCB)}
                </ul>
                </aside>
            </div>

            <div>
                <h3>Tera Type:</h3>
                    <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                        {props.pokemon.types?.map(printTeraTypesCB)}
                    </ul>    
            </div>
        </div>
        {MoveList()}
        {AbilityList()}
        </Box>
    </div>
    );
    function printBaseStatsCB(stats) {
        return <li key={stats.stat.name}>{stats.base_stat+" "+stats.stat.name}</li>;
    }
    function printTeraTypesCB(types) {
        return <li key={types.type.name}>{types.type.name}</li>;
    }


//TODO, lista ut hur man får ut värdet man väljer från movelist 

function MoveList() {

 return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 200 }}
      options={props.pokemon.moves}
      autoHighlight
      getOptionLabel={(option) => option.move.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.move.name}
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
      id="country-select-demo"
      sx={{ width: 200 }}
      options={props.pokemon.abilities}
      autoHighlight
      getOptionLabel={(option) => option.ability.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.ability.name}
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