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
  setTeam,
  clearTeam,
} from "/src/reduxStore.js";

export function connectToPersistence(store) {

    let firestoreDoc= null;

    function persistenceState(p) {
        return {hello: p.hello,
                user: p.user,
                ready: p.ready,
                team: p.team,
        }
    }

    let curr = persistenceState(store.getState().poke);

    store.subscribe(() => {
        const prev = curr;
        curr = persistenceState(store.getState().poke);

        if (!firestoreDoc || !curr.user || !curr.ready) return;

        if (prev.hello !== curr.hello) {
            setDoc(firestoreDoc, { hello: curr.hello }, { merge: true }); //hello
        }

        if (prev.team !== curr.team) {
            setDoc(firestoreDoc, { team: curr.team }, { merge: true }); //team
        }
    });

    if (curr.user) loadUserData(curr.user);

    onAuthStateChanged(auth, function logInOrOutACB(user){
        const userObj = user? {uid: user?.uid}:null;
        store.dispatch(setUser(userObj));
        // for A: use an action to set the 'user' property of the application state
       if (userObj) {
            loadUserData(userObj);
        } else {
            store.dispatch(clearTeam());
            store.dispatch(setReady(true));
        }
        // om user = null så sätts ready till true
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

        if (data?.team) {
            store.dispatch(setTeam(data.team));
        }

        if (data?.hello) {
            store.dispatch(fillFirestore(data.hello));
        }

        store.dispatch(setReady(true));
    }

    function onErrorACB(err) {
        console.error(err);
        store.dispatch(setReady(true));
    }
}
