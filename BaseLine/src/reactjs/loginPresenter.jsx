import { useSelector, useDispatch } from "react-redux";
import {auth} from "/src/firestoreModel.js"
import {LoginView} from "/src/views/loginView.jsx"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { setCurrentEmail, setCurrentPassword } from "/src/reduxStore.js"

export function Login(){
    const dispatch = useDispatch();

    const currentEmail = useSelector(
        (state) => state.dinner.currentEmail
    );

    const currentPassword = useSelector(
        (state) => state.dinner.currentPassword
    );

    return <LoginView 
    email={currentEmail} 
    password={currentPassword} 
    onLogin={loginACB} 
    emailEvent={emailHandlerACB}
    passwordEvent={passwordHandlerACB}
    />

    function loginACB(email, password, signIsIn){
        signIsIn? signInWithEmailAndPassword(auth, email, password).catch(onErrorACB) : createUserWithEmailAndPassword(auth, email, password).catch(onErrorACB)
        /* TODO save the error in some local app state or component state and send to the view */
        function onErrorACB(err) {console.error(err)}        
    }
    function emailHandlerACB(param) {
        dispatch(setCurrentEmail(param));
    }
    function passwordHandlerACB(param) {
        dispatch(setCurrentPassword(param));
    }
};