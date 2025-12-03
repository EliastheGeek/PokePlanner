import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "/src/mapToChatProps.js";
import { ChatView } from "../views/chatView.jsx";

export const ChatInputPresenter = connect(
    mapStateToProps,
    mapDispatchToProps
  )(function ChatInputPresenter(props) {

    function promptNowACB(){
        props.doPrompt(props.currentQuery);
    }

    function resetSessionACB(){
        props.resetSession();
    }

    return (
        <ChatView
            currentQuery={props.currentQuery}
            onPromptTextChange={props.setCurrentQuery}
            onPromptNow={promptNowACB}
            onSessionReset={resetSessionACB}
        />
    );
});