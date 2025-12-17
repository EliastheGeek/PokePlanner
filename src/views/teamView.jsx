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

        function showMoreACB(evt){props.onClickPokemon(pokemon?.name);}//gå till detailview för pokemon

        /*
            return <tr key={pokemon?.id} onClick = {showMoreACB}>
                     <td><button onClick = {onRemoveFromTeamACB}>x</button></td>
                     <td><a href="#/details" >{<img src={pokemon?.sprites?.front_default}/> }</a></td>
                     <td>{pokemon?.name}</td>
                   </tr>;
            
        }*/

        function clickPokemonACB(pokemon){
          props.onClickPokemon(pokemon);
        }

        return (
            <div className="pokemonCard" key={pokemon.id}>
              <button className="removeBtn" onClick={() => removeFromTeamACB(pokemon)}>×</button>
        
              <div className="imageWrapper" onClick={showMoreACB}>
                <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
              </div>
        
              <h2 className="pokeName">{pokemon.name}</h2>
              <p className="pokeInfo"># {pokemon.id}</p>
              <p className="pokeInfo">
                Type: {pokemon.types[0].type.name}
              </p>
            </div>
          );
        }
}