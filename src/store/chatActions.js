import { promptStart, promptSuccess, promptError } from "/src/reduxStore.js";
import { prompt } from "/src/chatSource.js";

export function doPromptThunk(query) {
    return function (dispatch) {
  
      dispatch(promptStart());
  
      prompt(query)
        .then(result => {
          if (!result?.choices?.[0]) 
            throw new Error("Bad API response: " + JSON.stringify(result));

          dispatch(promptSuccess(result));
        })
        .catch(err => {
          dispatch(promptError(err.message));
        });
    };
}