// initialize Firebase app
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// uncomment the following lines when you have your firebaseConfig. Understand what the lines are doing!

import {firebaseConfig} from "/src/firebaseConfig.js";
const app= initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db= getFirestore(app);
window.db= db;

// make doc and setDoc available at the Console for testing
window.doc= doc;
window.setDoc= setDoc;
window.getDoc= getDoc;

const COLLECTION="pokemonModelG5";

import {
  setUser,
  setReady,
  fillFirestore,
} from "/src/reduxStore.js";

export function connectToPersistence(store) {

    let firestoreDoc= null;

    function persistenceState(p) {
        return {hello: p.hello,
                user: p.user,
                ready: p.ready,
        }
    }

    let curr = persistenceState(store.getState().poke);
    store.subscribe(() => {
        const prev = curr;
        curr = persistenceState(store.getState().poke);

        if (prev.hello !== curr.hello) {   
            if (curr.user && curr.ready) {
                setDoc(firestoreDoc, {hello: curr.hello}, {merge:true})
            }
        }
    })

    if (curr.user) loadUserData(curr.user);

    onAuthStateChanged(auth, function logInOrOutACB(user){
        const userObj = user? {uid: user?.uid}:null;
        store.dispatch(setUser(userObj));
        // for A: use an action to set the 'user' property of the application state
        if (userObj) loadUserData(userObj);
    })

    function loadUserData(user) {
        firestoreDoc = doc(db, COLLECTION, user.uid);

        store.dispatch(setReady(false));
        getDoc(firestoreDoc).then(readyACB).catch(onErrorACB);

        // somebody has just logged in!
        // TODO model.ready false
        // for A: use an action to set the 'ready' property of the application state
        console.log("now we need to read from persistence the data of "+user.uid);
        // TODO model.ready true at the end of the "read from persistence" promise chain
    }
    
    function readyACB(doc) {
        const data = doc.data();
        const hello = data?.hello ?? "nello";
        
        store.dispatch(fillFirestore(hello));
        //(devComment) Koden nedan måste finnas ifall vi har någon middleware (Redux side effect) 
        // som uppdaterar något baserat på värden i FireStore
        //Ekvivalent i DinnerModel är ifall vi uppdaterar om vi befinner oss på details. Utan koden
        // får vi no data.
        //if (data?.currentDish) store.dispatch(setCurrentDishId(data?.currentDish));
        store.dispatch(setReady(true));
    }

    function onErrorACB(err) {
        console.error(err);
        store.dispatch(setReady(true));
    }
}
