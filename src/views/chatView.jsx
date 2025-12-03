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
            <div className="inputBox">
    
                <input
                        type="text"
                        placeholder="Ask something..."
                        value={props.currentQuery || ""}
                        onChange={onPromptChangeACB}
                        onKeyDown={ handleInputKeyDownACB }
                />
    
                <button type="button" onClick={promptACB}>Prompt away</button>
                <button type="button" onClick={startNewSessionACB}>Start new chat session</button>
    
            </div>
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