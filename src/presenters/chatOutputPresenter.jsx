import { connect } from "react-redux";
import { mapStateToProps } from "../mapToChatProps.js";
import { ChatView } from "../views/chatView.jsx";

export const ChatOutputPresenter = connect(
    mapStateToProps
)(function ChatOutputPresenter(props) {
    
    if (props.loading) return <img src="https://brfenergi.se/iprog/loading.gif"/>; // loading wheel

    if (props.error) return <div>Error: {props.error}</div>;

    if (props.currentResponse)
        return <ChatView currentResponse={props.currentResponse} />;
    
    return null;
});