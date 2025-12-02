export function ChatView(props) {

    function onPromptChangeACB(e) {
        props.onPromptTextChange(e.target.value);
        console.log("props.query =", props.query);
    }

    function promptACB(e) { 
        props.onPromptNow();
    }

    function askAnotherQuestionACB() {
        props.onResponseReset();
    }

    function handleInputKeyDownACB(evt){
        if(evt.key === "Enter")
            props.onPromptNow();
    }

    if (props.loading) {
        return <div className="loadingText">Loading...</div>;
    }

    if (props.response == null) {
        return (
            <div className="inputBox">
    
                <input
                        type="text"
                        placeholder="Ask something..."
                        value={props.query || ""}
                        onChange={onPromptChangeACB}
                        onKeyDown={ handleInputKeyDownACB }
                />
    
                <button type="button" onClick={promptACB}>Prompt away</button>
                <button type="button" onClick={askAnotherQuestionACB}>Ask another question</button>
    
            </div>
        );
    } else {
        return (
            <div className="responseText">
                <span className="responseLabel">Response:</span>
                <div className="responseContent">
                    {props.response}
                </div>
            </div>
        );
    }
}