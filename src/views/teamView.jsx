function mapStateToProps(state){
return {    
    team: state.team,
    currentPokemonId: state.currentPokemonId,
};
}
function mapDispatchToProps(dispatch){
    return {
    addToTeam: function addToTeam(pokemon){dispatch( {value:pokemon} );},
    removeFromTeam: function removeFromTeam(pokemon){dispatch( {value:pokemon} );},
    }
}
const TeamPresenter = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(TeamView);