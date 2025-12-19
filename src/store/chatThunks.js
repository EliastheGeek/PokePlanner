import { promptStart, promptSuccess, promptError } from "/src/reduxStore.js";
import { prompt } from "/src/chatSource.js";
import { stripTeam, stripPokemon } from "/src/objectStripper";

export function doPromptThunk(query) {
    return async function (dispatch, getState) {
      const state = getState();

      let currentTeam = null;
      let note = "none";

      dispatch(promptStart(query));

      try {
        if (state.chat.includeTeam){
          note = "team";
          currentTeam = stripTeam( state.poke.team );
          console.log("team:", currentTeam);
        }

        const result = await prompt(currentTeam, query, note);
        dispatch(promptSuccess(result));
      } catch (err) {
        dispatch(promptError(err.message));
      }
    };
}

export function doPreparedPromptThunk(query) {
  return async function (dispatch, getState) {
    const state = getState();

    dispatch(promptStart(query));

    let appendObject = null;
    let note = "";

    const preparedPrompt = state.chat.preparedPrompts.find(
      p => p.query === query
    );

    const currentPokemon = state.poke.team.find(
      p => p.name === state.poke.currentPokemonName
    ); 

    if (preparedPrompt) {
      note = preparedPrompt.append;
      if (note === "team") {
        appendObject = stripTeam( state.poke.team );
      } else if (note === "pokemon") {
        appendObject = stripPokemon( currentPokemon );
      }
      console.log("pokemon:", appendObject);
    }

    try {
        const result = await prompt(appendObject, query, note);
        dispatch(promptSuccess(result));
      } catch (err) {
        dispatch(promptError(err.message));
      }
  };
}

window.doPromptThunk = doPromptThunk;
window.doPreparedPromptThunk = doPreparedPromptThunk;