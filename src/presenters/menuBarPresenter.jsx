import { useSelector } from "react-redux";
import MenuBarView from "/src/views/menuBarView.jsx";

import {auth} from "../firestoreModel.js"
import { signOut } from "firebase/auth"

export function MenuBar(){
  
    const user = useSelector((state) => state.poke.user);

    return <MenuBarView user={user} 
                      onLogout={onLogoutACB}/>

    function onLogoutACB(){signOut(auth).catch(onErrorACB);}
    function onErrorACB(err) {console.error(err);}
}