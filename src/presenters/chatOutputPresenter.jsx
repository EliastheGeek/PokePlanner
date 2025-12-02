import { connect } from "react-redux";
import { mapStateToChatProps } from "../mapToChatProps.js";
import { ChatView } from "../views/chatView.jsx";

export const ChatOutputPresenter = connect(
    mapStateToChatProps
)(function ChatOutputPresenter(props) {
    
    if (props.loading) return <img src="https://brfenergi.se/iprog/loading.gif"/>; // loading wheel

    if (props.error) return <div>Error: {props.error}</div>;

    if (props.response)
        return <ChatView response={props.response} />;
    
    return null;
});