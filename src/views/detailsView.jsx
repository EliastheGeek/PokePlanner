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
    </div>
    );
    function printBaseStatsCB(stats) {
        return <li key={stats.stat.name}>{stats.base_stat+" "+stats.stat.name}</li>;
    }
    function printTeraTypesCB(types) {
        return <li key={types.type.name}>{types.type.name}</li>;
    }




function MoveList() {

    const MoveList = [
    {   move: {
        name: "volt-tackle",
        url: "https://pokeapi.co/api/v2/move/344/"
      },
    version_group_details: [//array med olika spel, kan vara relevant att antingen välja ett spel i förhand eller låta användaren välja 
        {
          level_learned_at: 0,
          move_learn_method: { name: "tutor"},
          order: null,
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/"
            }
        },
        ],
    },
    {
    move: {
        name: "shock-wave",
        url: "https://pokeapi.co/api/v2/move/351/"
      },
    version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: { name: "tutor"},
          order: null,
          version_group: {
            name: "platinum",
            url: "https://pokeapi.co/api/v2/version-group/9/"
            }
        },
        ],
    },
    {
    move: {
        name: "quick-attack",
        url: "https://pokeapi.co/api/v2/move/98/"
      },
    version_group_details: [ 
        {
          level_learned_at: 13,
          move_learn_method: { name: "level-up"},
          order: null,
          version_group: {
            name: "black-white",
            url: "https://pokeapi.co/api/v2/version-group/11/"
            }
        },
        ],
    },
    {
    move: {
        name: "thunder",
        url: "https://pokeapi.co/api/v2/move/87/"
      },
    version_group_details: [
        {
          level_learned_at: 58,
          move_learn_method: { name: "level-up"},
          order: null,
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/"
            }
        },
        ],
    }
    ]

 return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 200 }}
      options={MoveList}
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
}