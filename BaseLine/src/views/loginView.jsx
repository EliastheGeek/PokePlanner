export function LoginView(props){
    return (
    <div>
        <form onSubmit={submitHandlerACB}>
            <label>
                email: <input type="email" value = {props.email || ""} onChange={setEmailACB}/>
            </label>
            <label>
                password: <input type="password" value = {props.password || ""} onChange={setPasswordACB}/>
            </label>
            <input type="submit" value="Log in"/>
            <input type="submit" value="Register"/>
        </form>
    </div>);

    function setEmailACB(evt) {
        props.emailEvent(evt.target.value);
    }

    function setPasswordACB(evt) {
        props.passwordEvent(evt.target.value);
    }

    function submitHandlerACB(event) {
        event.preventDefault();

        const submitter = event.nativeEvent.submitter;
        const action = submitter.value;

        if (action === "Log in") props.onLogin(props.email, props.password, true);
        else props.onLogin(props.email, props.password, false);
    } 
}