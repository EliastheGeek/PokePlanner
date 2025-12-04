import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';


export function ChatView(props) {

    function onPromptChangeACB(e) {
        props.onPromptTextChange(e.target.value);
        console.log("props.currentQuery =", props.currentQuery);
    }

    function promptACB(e) {
        props.onPromptNow();
    }

    function startNewSessionACB() {
        props.onSessionReset();
    }

    function handleInputKeyDownACB(evt){
        if(evt.key === "Enter")
            props.onPromptNow();
    }

    if (props.loading) {
        return <div className="loadingText">Loading...</div>;
    }

    if (props.currentResponse == null) {
        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField sx={{ width: 300, color: 'black' }} id="standard-basic-basic" label="Type your prompt here" variant="standard" onChange={onPromptChangeACB} onKeyDown={ handleInputKeyDownACB }/>
                <Button sx={{ width: 150, color: 'black' }} variant="contained" onClick={ promptACB }>
                    <SendIcon sx={{ color: "white" }}/>
                </Button>
            </Box>
        );
    } else {
        return (
            <div className="responseText">
                <span className="responseLabel">Response:</span>
                <div className="responseContent">
                    {props.currentResponse}
                </div>
            </div>
        );
    }
}