import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "/src/mapToChatProps.js";
import { ChatView } from "../views/chatView.jsx";

export const ChatInputPresenter = connect(
    mapStateToProps,
    mapDispatchToProps
  )(function ChatInputPresenter(props) {

    return (
        <ChatView
            query={props.query}
            onPromptTextChange={props.setQuery}
            onPromptNow={() => props.doPrompt(props.query)}
            onResponseReset={() => props.resetResponse()}
        />
    );
});