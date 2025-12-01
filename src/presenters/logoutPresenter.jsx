import {LogoutView} from "../views/logoutView.jsx"
import {auth} from "../firestoreModel.js"

import { signOut } from "firebase/auth"

export function Logout() {
    return <LogoutView onLogout={onLogoutACB}/>
    
    function onLogoutACB(){signOut(auth).catch(onErrorACB);}
    function onErrorACB(err) {console.error(err);}
}