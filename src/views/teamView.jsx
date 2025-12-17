export function TeamView(props){

    const MAX_TEAM = 6;
    const team = props.team ?? [];
    const emptySlots = Array(MAX_TEAM - team.length).fill(null);
    const slots = [...team.slice(0, MAX_TEAM), ...emptySlots];

    return (
        <div className="teamView">
            <div className="teamGrid">
                {slots.map((pokemon, index) =>
                    pokemon ? (
                      showTeamCB(pokemon)
                    ) : (
                    <div key={"empty-"+index} className="emptyCard">
                        <span>+</span>
                    </div>
                    )
                )}
            </div>
            
             
        </div>
    );
    

    function showTeamCB(pokemon){

        function removeFromTeamACB(pokemon){
          // TODO: Add so confirmation pop up appears
          props.onRemoveFromTeam(pokemon);
        }

        function showMoreACB(evt){
          props.onClickPokemon(pokemon?.name);
        }

        function clickPokemonACB(pokemon){
          props.onClickPokemon(pokemon);
        }

        return (
            <div className="pokemonCard" key={pokemon.id} title={`See details for ${pokemon.name}`}>

              <button 
                className="removeBtn" 
                onClick={() => removeFromTeamACB(pokemon)}
              >
                X
              </button>
        
              <div
                className="imageWrapper"
                onClick={() => showMoreACB(pokemon)}
              >
                <img
                  src={pokemon?.sprites?.front_default}
                  alt={pokemon.name}
                />
              </div>
        
              <h2 className="pokeName">{pokemon.name}</h2>
              <p className="pokeInfo"># {pokemon.id}</p>
              <p className="pokeInfo">
                Type: {pokemon.types?.map(printTeraTypesCB)}
              </p>
            </div>
          );
        }
        
    function printTeraTypesCB(types) {
        return <li key={types.type.name}>{types.type.name}</li>;
    }
}