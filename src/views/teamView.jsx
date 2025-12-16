export function TeamView(props){

    const teamCopy = props.team;
    const MAX_TEAM = 6;
    const emptySlots = Array(MAX_TEAM - props.team.length).fill(null);
    const slots = [...teamCopy, ...emptySlots]; 

    return (
        <div>

            <div className="teamGrid">
                {teamCopy?.map(showTeamCB)}

                {slots.map((pokemon, index) =>
                    pokemon ? (
                    <showTeamCB
                    />
                    ) : (
                    <div key={"empty-"+index} className="emptyCard">
                        <span>Empty</span>
                    </div>
                    )
                )}
            </div>
            
             
        </div>
    );
    

    function showTeamCB(pokemon){

        function onRemoveFromTeam(){}
        function onClickPokemon(){}
        return (
            <div className="pokemonCard" key={pokemon.id}>
              <button className="removeBtn" onClick={() => onRemoveFromTeam(pokemon)}>×</button>
        
              <div className="imageWrapper" onClick={() => onClickPokemon(pokemon)}>
                <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
              </div>
        
              <h2 className="pokeName">{pokemon.name}</h2>
              <p className="pokeInfo">ID: {pokemon.id}</p>
              <p className="pokeInfo">
                Type: {pokemon.types[0].type.name}
              </p>
            </div>
          );
        /*
            return <tr key={pokemon.id} className="teamCard">
                     <td><button onClick = {onRemoveFromTeamACB}>x</button></td>
                     <td><a href="#/details" onClick = {showMoreACB}>{<img src={pokemon?.sprites?.front_default}/> }</a></td>
                     <td>{pokemon.name}</td>
                     <td>ID: {pokemon.id}</td>
                     <td>Type: {pokemon.types[0].type.name}</td>
                   </tr>;
            function showMoreACB(evt){props.onClickPokemon(pokemon);}//gå till detailview för pokemon
                function onRemoveFromTeamACB(evt){props.onRemoveFromTeam(pokemon)}*/
        }
}
/*    function onAddToTeamACB(evt){
        props.onAddToTeam(props.currentPokemonId)//fetch ny pokemon
    }
*/