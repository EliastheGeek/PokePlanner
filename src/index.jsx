import {createElement, Fragment} from "react";
//window.React= {createElement:createElement, Fragment:Fragment}; // needed in the lab because it works with both React and Vue

//import "/src/teacherFetch.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"
import { store } from "/src/reduxStore.js"
import { connectToPersistence } from "/src/firestoreModel.js";
import { Root } from "/src/Root.jsx";

connectToPersistence(store);

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Root />
    </Provider>
);