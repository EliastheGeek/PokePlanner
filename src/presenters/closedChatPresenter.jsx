import { useDispatch, useSelector } from "react-redux";
import { ClosedChatView } from "/src/views/closedChatView.jsx";
import { doPromptThunk, doPreparedPromptThunk } from "/src/store/chatThunks";

export function ClosedChat(props) {
    const dispatch = useDispatch();

    return (
        <ClosedChatView
            preparedPrompts={props.preparedPrompts}
            onPreparedPromptClick={startPromptACB}
            onToggleChat={toggleShowChatACB}
        />
    );

    function startPromptACB(query){
        toggleShowChatACB();
        dispatch(doPreparedPromptThunk(query));
    }

    function toggleShowChatACB(){
        props.onToggleChatWindow();
    }
}