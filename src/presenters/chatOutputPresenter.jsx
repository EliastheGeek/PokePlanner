import { connect } from "react-redux";
import { mapStateToProps } from "../mapToChatProps.js";
import { ChatView } from "../views/chatView.jsx";
import CircularProgress from '@mui/material/CircularProgress';

export const ChatOutputPresenter = connect(
    mapStateToProps
)(function ChatOutputPresenter(props) {
    
    if (props.loading) return <CircularProgress />
    if (props.error) return <div>Error: {props.error}</div>;

    if (props.currentResponse)
        return <ChatView currentResponse={props.currentResponse} />;
    
    return null;
});