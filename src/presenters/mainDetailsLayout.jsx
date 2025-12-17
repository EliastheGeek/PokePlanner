import { useSelector, useDispatch } from "react-redux";
import { toggleChatWindow } from "/src/reduxStore.js";

import { Details } from "/src/presenters/detailsPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";

export function MainDetailsLayout() {
  
  const chatOpen = useSelector(state => state.chat.windowOpen);
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
          <ChatBot location="detailsView"
                   onToggleChatWindow={toggleChatACB}/>
        </div>
      ) : (
        <button className="chatRestoreBtn" onClick={toggleChatACB}>
          💬
        </button>
      )}
    </div>
  );
}