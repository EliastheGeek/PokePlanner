import { promptStart, promptSuccess, promptError } from "/src/reduxStore.js";
import { prompt } from "/src/chatSource.js";

export function doPromptThunk(query) {
    return async function (dispatch) {
  
      dispatch(promptStart(query));
  
      try {
        const result = await prompt(query);
        dispatch(promptSuccess(result));
      } catch (err) {
        dispatch(promptError(err.message));
      }
    };
}

window.doPromptThunk = doPromptThunk;