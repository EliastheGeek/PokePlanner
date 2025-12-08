import { useDispatch, useSelector } from "react-redux";
import { ChatInterface } from "/src/views/chatInterface.jsx";
import { promptStart, setIncludeTeam } from "/src/reduxStore.js";
import { doPromptThunk } from "/src/store/chatThunks";

export function ChatBot() {
    const dispatch = useDispatch();

    const {
        includeTeam,
        messages,
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
            onPromptNow={startPromptACB}
        />
    );

    function startPromptACB(query){
        dispatch(doPromptThunk(query));
    }

    function toggleIncludeTeamACB(){
        if (includeTeam){
            dispatch(setIncludeTeam(false))
        } else {
            dispatch(setIncludeTeam(true))
        }
    }
}