import { setCurrentQuery, resetSession } from "./reduxStore";
import { doPromptThunk } from "./store/chatActions";

// Presenter for ChatView input
export function mapStateToProps(state) {
  return {
    currentQuery: state.chat.currentQuery,
    currentResponse: state.chat.currentResponse,
    loading: state.chat.loading,
    error: state.chat.error
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuery: (q) => dispatch(setCurrentQuery(q)),
    doPrompt: (q) => dispatch(doPromptThunk(q)),
    setCurrentResponse: (r) => dispatch(setCurrentResponse(r)),
    resetSession: () => dispatch(resetSession()),
  };
}