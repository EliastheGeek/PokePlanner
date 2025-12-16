export function TeamView(props){
    const teamCopy = props.team;
    return (
        <div>
            
            <table>
                <tbody>
                    {teamCopy?.map(showTeamCB)}
                </tbody>
            </table>                
        </div>
    );
    

    function showTeamCB(pokemon){
            return <tr key={pokemon?.id} onClick = {showMoreACB}>
                     <td><button onClick = {onRemoveFromTeamACB}>x</button></td>
                     <td><a href="#/details" >{<img src={pokemon?.sprites?.front_default}/> }</a></td>
                     <td>{pokemon?.name}</td>
                   </tr>;
            function showMoreACB(evt){props.onClickPokemon(pokemon?.name);}//gå till detailview för pokemon
                function onRemoveFromTeamACB(evt){props.onRemoveFromTeam(pokemon)}
        }
}
/*    function onAddToTeamACB(evt){
        props.onAddToTeam(props.currentPokemonId)//fetch ny pokemon
    }
*/