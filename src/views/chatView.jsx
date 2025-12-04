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
                <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "70vh",     // full height view
                            padding: 2
                        }}
                    >
                        {/* MESSAGES AREA */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                paddingRight: 1
                            }}
                        >
                            {/* Example: render previous responses */}
                            {props.responses?.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        backgroundColor: "#eaeaea",
                                        padding: 2,
                                        borderRadius: 2,
                                        maxWidth: "80%"
                                    }}
                                >
                                    {msg}
                                </Box>
                            ))}

                            {/* Show current response if one exists */}
                            {props.currentResponse && (
                                <Box
                                    sx={{
                                        backgroundColor: "#dcdcdc",
                                        padding: 2,
                                        borderRadius: 2,
                                        maxWidth: "80%"
                                    }}
                                >
                                    {props.currentResponse}
                                </Box>
                            )}
                        </Box>

                        {/* INPUT BAR (BOTTOM) */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mt: "auto"
                            }}
                        >
                            <TextField
                                sx={{ flexGrow: 1 }}
                                label="Type your prompt here"
                                variant="standard"
                                onChange={onPromptChangeACB}
                                onKeyDown={handleInputKeyDownACB}
                            />

                            <Button variant="contained" onClick={promptACB}>
                                <SendIcon sx={{ fontSize: 32, color: "white" }} />
                            </Button>
                        </Box>
                    </Box>

        );
    } 
}