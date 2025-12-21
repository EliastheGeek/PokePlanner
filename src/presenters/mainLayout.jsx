import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { toggleChatWindow, resetChat, setChatContext } from "/src/reduxStore.js";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { Search } from "/src/presenters/searchPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { ClosedChat } from "/src/presenters/closedChatPresenter.jsx";

export function MainLayout() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetChat());
    dispatch(setChatContext("teamView"));
  }, [dispatch]);

  const context = useSelector(state => state.chat.context);
  const chatOpen = useSelector(state => state.chat.windowOpen);
  const preparedPrompts = useSelector(state => state.chat.preparedPrompts);
  const visiblePreparedPrompts = preparedPrompts.filter(q => q.context === context);

  function toggleChatACB() {
    dispatch(toggleChatWindow());
  }

  return (
    <div className="horizontalFlexParentMain">
      <div className={`teamView ${chatOpen ? "withChat" : "fullWidth"}`}>
        <div className="teamPanel">
          <Team className="teamScroll"/>
          <Search />
        </div>
      </div>

      {chatOpen ? (
        <div className="pokeBotBox">
          <ChatBot preparedPrompts={visiblePreparedPrompts}
                   onToggleChatWindow={toggleChatACB}/>
        </div>
      ) : (
        <div className="closedPokeBot">
          <ClosedChat preparedPrompts={visiblePreparedPrompts}
                      onToggleChatWindow={toggleChatACB}/>
        </div>
      )}
    </div>
  );
}