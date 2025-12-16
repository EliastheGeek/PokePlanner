import { useDispatch, useSelector } from "react-redux";
import { ChatInterface } from "/src/views/chatInterface.jsx";
import { setIncludeTeam } from "/src/reduxStore.js";
import { doPromptThunk } from "/src/store/chatThunks";

export function ChatBot(props) {
    const dispatch = useDispatch();

    const {
        includeTeam,
        messages,
        preparedPrompts,
        windowOpen,
        loading, 
        error
    } = useSelector((state) => state.chat);

    const team = useSelector((state) => state.poke);

    const visiblePreparedPrompts = preparedPrompts.filter(
        q => q.location === props.location
    );

    return (
        <ChatInterface
            messages={messages}
            loading={loading}
            error={error}
            includeTeam={includeTeam}
            onToggleIncludeTeam={toggleIncludeTeamACB}
            preparedPrompts={visiblePreparedPrompts}
            onPreparedPromptClick={startPromptACB}
            onPromptNow={startPromptACB}
            onToggleChat={toggleShowChatACB}
        />
    );

    function startPromptACB(query){
        dispatch(doPromptThunk(query));
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