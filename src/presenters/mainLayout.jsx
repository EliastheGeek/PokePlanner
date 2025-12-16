import { useSelector, useDispatch } from "react-redux";
import { toggleChatWindow } from "/src/reduxStore.js";

import { Team } from "/src/presenters/teamPresenter.jsx";
import { Search } from "/src/presenters/searchPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function MainLayout() {
  const chatOpen = useSelector(state => state.chat.windowOpen);
  const dispatch = useDispatch();

  function toggleChatACB() {
    dispatch(toggleChatWindow());
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
          <ChatBot />
        </div>
      ) : (
        <button className="chatRestoreBtn" onClick={toggleChatACB}>
          💬
        </button>
      )}
    </div>
  );
}