import { promptStart, promptSuccess, promptError } from "/src/reduxStore.js";
import { prompt } from "/src/chatSource.js";

export function doPromptThunk(query) {
    return async function (dispatch, getState) {

      let currentTeam = null;

      dispatch(promptStart(query));

      try {
        if (getState().chat.includeTeam){
          currentTeam = getState().poke.team;
        }

        const result = await prompt(currentTeam, query);
        dispatch(promptSuccess(result));
      } catch (err) {
        dispatch(promptError(err.message));
      }
    };
}

window.doPromptThunk = doPromptThunk;