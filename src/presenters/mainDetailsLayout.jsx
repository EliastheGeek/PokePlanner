import { useSelector, useDispatch } from "react-redux";
import { toggleChatWindow } from "/src/reduxStore.js";

import { Details } from "/src/presenters/detailsPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { ClosedChat } from "/src/presenters/closedChatPresenter.jsx";

export function MainDetailsLayout() {
  
  const chatOpen = useSelector(state => state.chat.windowOpen);
  const preparedPrompts = useSelector(state =>
    state.chat.preparedPrompts.filter(q => q.context === "detailsView")
  );

  const dispatch = useDispatch();

  function toggleChatACB() {
    dispatch(toggleChatWindow());
  }

  return (
    <div className="horizontalFlexParentMainDetails">
      <div className={`detailsView ${chatOpen ? "withChat" : "fullWidth"}`}>
        <div className="detailsPanel">
          <Details />
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