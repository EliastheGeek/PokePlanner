import {createElement, Fragment} from "react";
window.React= {createElement:createElement, Fragment:Fragment}; // needed in the lab because it works with both React and Vue

import "/src/teacherFetch.js";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"
import { store } from "/src/reduxStore.js"
import { connectToPersistence } from "/src/firestoreModel.js";
import { ReactRoot } from "./ReactRoot.jsx";
import { doSearch } from "/src/reduxStore.js"

connectToPersistence(store);

store.dispatch(doSearch({}))
// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ReactRoot />
    </Provider>
);