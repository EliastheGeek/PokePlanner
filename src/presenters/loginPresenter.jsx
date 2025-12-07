import { useSelector, useDispatch } from "react-redux";
import {auth} from "/src/firestoreModel.js"
import {LoginView} from "/src/views/loginView.jsx"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { setCurrentEmail, setCurrentPassword, setAuthError } from "/src/reduxStore.js"

import { useEffect } from "react";

export function Login(){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.poke.user);
    const currentEmail = useSelector(
        (state) => state.poke.currentEmail
    );

    const currentPassword = useSelector(
        (state) => state.poke.currentPassword
    );
    const authError = useSelector(
        (state) => state.poke.authError
    );


    useEffect(() => {
        if (user) {
            window.location.hash = "#/";
        }
    }, [user]);

    if (user) {
        return null;
    }

    return <LoginView 
    email={currentEmail} 
    password={currentPassword} 
    onLogin={loginACB} 
    emailEvent={emailHandlerACB}
    passwordEvent={passwordHandlerACB}
    loginError={authError}
    />

    function loginACB(email, password, signIsIn){
        dispatch(setAuthError(null));   //clear authError

        signIsIn? signInWithEmailAndPassword(auth, email, password).catch(onErrorACB) : createUserWithEmailAndPassword(auth, email, password).catch(onErrorACB)
        /* TODO save the error in some local app state or component state and send to the view */
        function onErrorACB(err) { dispatch(setAuthError(err.message)); }        
    }
    function emailHandlerACB(param) {
        dispatch(setCurrentEmail(param));
    }
    function passwordHandlerACB(param) {
        dispatch(setCurrentPassword(param));
    }
};