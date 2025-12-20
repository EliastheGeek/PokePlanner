import pokeSilhouette from "/src/assets/pokesilhouette.png";

export function TeamView(props){

    const MAX_TEAM = 6;
    const team = props.team ?? [];
    const emptySlots = Array(MAX_TEAM - team.length).fill(null);
    const slots = [...team.slice(0, MAX_TEAM), ...emptySlots];
    


    function closeACB(evt) {
        // Handle right-click / context menu to close the view
        evt.preventDefault();
        if (typeof props.handleClose === "function") {
            props.handleClose();
        }
    }
    return (    
        <div className="teamView" onContextMenu={closeACB}>
            <div className="teamGrid">
                {slots.map((pokemon, index) =>
                    pokemon ? (
                      showTeamCB(pokemon)
                    ) : (
                    <div key={"empty-"+index} className="emptyCard" onClick={props.handleOpen} >
                        <img 
                            src={pokeSilhouette}
                            width={80}/>
                            <b>Add Pokemon +</b>
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

        function showMoreACB(pokemon){
          props.onClickPokemon(pokemon);
        }

        return (
            <div className="pokemonCard" key={pokemon.id}>

              <button 
                className="removeBtn" 
                onClick={() => removeFromTeamACB(pokemon)}
                title={`Remove ${pokemon.name} from team`}
              >
                X
              </button>

              <div
              title={`See details for ${pokemon.name}`}
              onClick={() => showMoreACB(pokemon)}
                className="imageWrapper"
              >
                <img
                  src={pokemon?.sprites?.front_default}
                  alt={pokemon.name}
                />
              </div>
        
              <h2 className="pokeName">{pokemon.name}</h2>
              <p className="pokeInfo">Level: {pokemon.level} #{pokemon.id}</p>

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