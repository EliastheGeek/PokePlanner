import { useDispatch, useSelector } from "react-redux";
import { ClosedChatView } from "/src/views/closedChatView.jsx";
import { doPromptThunk } from "/src/store/chatThunks";

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
        dispatch(doPromptThunk(query));
    }

    function toggleShowChatACB(){
        props.onToggleChatWindow();
    }
}