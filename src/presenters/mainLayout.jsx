import { useSelector, useDispatch } from "react-redux";
import { toggleChatWindow } from "/src/reduxStore.js";

import { Team } from "/src/presenters/teamPresenter.jsx";
import { Search } from "/src/presenters/searchPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { ClosedChat } from "/src/presenters/closedChatPresenter.jsx";

export function MainLayout() {
  
  const chatOpen = useSelector(state => state.chat.windowOpen);
  const preparedPrompts = useSelector(state =>
    state.chat.preparedPrompts.filter(q => q.context === "teamView")
  );

  const dispatch = useDispatch();

  function toggleChatACB() {
    dispatch(toggleChatWindow());
  }

  function runPreparedQueryACB(query) {
    if (!chatOpen) {
      dispatch(toggleChatWindow());
    }
    dispatch(doPromptThunk(query));
  }

  return (
    <div className="horizontalFlexParentMain">
      <div className={`teamView ${chatOpen ? "withChat" : "fullWidth"}`}>
        <div className="teamPanel">
          <Team />
          <Search />
        </div>
      </div>

      {chatOpen ? (
        <div className="pokeBotBox">
          <ChatBot preparedPrompts={preparedPrompts}
                   onToggleChatWindow={toggleChatACB}/>
        </div>
      ) : (
        <div className="closedPokeBot">
          <ClosedChat preparedPrompts={preparedPrompts}
                      onToggleChatWindow={toggleChatACB}/>
        </div>
      )}
    </div>
  );
}