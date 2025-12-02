import { setQuery, resetResponse } from "./reduxStore";
import { doPromptThunk } from "./store/chatActions";

// Presenter for ChatView input
export function mapStateToProps(state) {
  return {
    query: state.chat.query
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    setQuery: (q) => dispatch(setQuery(q)),
    doPrompt: (q) => dispatch(doPromptThunk(q)),
    resetResponse: () => dispatch(resetResponse()),
  };
}

// Presenter for response/loading/error UI
export function mapStateToChatProps(state) {
  return {
    query: state.chat.query,
    response: state.chat.response,
    loading: state.chat.loading,
    error: state.chat.error
  };
}