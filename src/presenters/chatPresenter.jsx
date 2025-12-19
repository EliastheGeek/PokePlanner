import { useDispatch, useSelector } from "react-redux";
import { ChatInterface } from "/src/views/chatInterface.jsx";
import { setIncludeTeam } from "/src/reduxStore.js";
import { doPromptThunk, doPreparedPromptThunk } from "/src/store/chatThunks";

export function ChatBot(props) {
    const dispatch = useDispatch();

    const {
        includeTeam,
        messages,
        windowOpen,
        loading, 
        error
    } = useSelector((state) => state.chat);

    const team = useSelector((state) => state.poke);

    return (
        <ChatInterface
            messages={messages}
            loading={loading}
            error={error}
            includeTeam={includeTeam}
            onToggleIncludeTeam={toggleIncludeTeamACB}
            preparedPrompts={props.preparedPrompts}
            onPreparedPromptClick={startPreparedPromptACB}
            onPromptNow={startPromptACB}
            onToggleChat={toggleShowChatACB}
        />
    );

    function startPromptACB(query){
        dispatch(doPromptThunk(query));
    }

    function startPreparedPromptACB(query){
        dispatch(doPreparedPromptThunk(query));
    }

    function toggleShowChatACB(){
        props.onToggleChatWindow();
    }

    function toggleIncludeTeamACB(){
        if (includeTeam){
            dispatch(setIncludeTeam(false))
        } else {
            dispatch(setIncludeTeam(true))
        }
    }
}