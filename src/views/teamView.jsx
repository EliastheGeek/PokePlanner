export function TeamView(props){
    const teamCopy = props.team;
    return (
        <div>
            <table>
                <tbody>
                    {teamCopy?.map(showTeamCB)}
                </tbody>
            </table>                
                 <button style={{float: "right"}} onClick={onAddToTeamACB}>Add to Team</button>
        </div>
    );
    
    function onAddToTeamACB(evt){
        props.onAddToTeam(props.currentPokemonId)//fetch ny pokemon
    }

    function showTeamCB(pokemon){
            return <tr key={pokemon.id}>
                     <td><button onClick = {onRemoveFromTeamACB}>x</button></td>
                     <td><a href="#/details" onClick = {showMoreACB}>{<img src={pokemon?.sprites?.front_default}/> }</a></td>
                     <td>{pokemon.name}</td>
                   </tr>;
            function showMoreACB(evt){props.onClickPokemon(pokemon);}//gå till detailview för pokemon
                function onRemoveFromTeamACB(evt){props.onRemoveFromTeam(pokemon)}
        }
}
