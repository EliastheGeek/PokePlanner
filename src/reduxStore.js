import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";

const initialState = {
    //Promise-stuff
    searchParams: {},
    searchResultsPromiseState: { promise: null, data: null, error: null },
    currentDishPromiseState: { promise: null, data: null, error: null },

    //Persistance
    hello: "hello",
    user: undefined,
    ready: false, 

    //Authentication
    currentEmail: null,
    currentPassword: null,
};

const pokeSlice = createSlice({
    name: "poke",
    initialState: initialState,
    reducers: {
        //Authentication
        setCurrentEmail(state, action){
            state.currentEmail = action.payload;
        },

        setCurrentPassword(state, action){
            state.currentPassword = action.payload;
        },
        //Just for persistence
        setUser(state, action) {
            state.user = action.payload;
        },
        setReady(state, action) {
            state.ready = action.payload;
        },
        fillFirestore(state, action) {
            //(devComment) Lägg till flera variabler ifall fler sakker ska pushas till FireStore
            const hello = action.payload;
            state.hello = hello;
        },

        //just for middleware
    }
});

export const {
    setUser,
    setReady,
    fillFirestore,
    setCurrentEmail,
    setCurrentPassword,
} = pokeSlice.actions;

// ---------- //
// Chat stuff //
// ---------- //
const chatInitialState = {
    query: "",
    response: null,
    loading: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        promptStart(state) {
            state.loading = true;
            state.error = null;
        },
        promptSuccess(state, action) {
            state.loading = false;
            state.response = action.payload;
        },
        promptError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetResponse(state) {
            state.response = null;
            state.query = null;
            state.error = null;
            state.loading = false;
        }
    }
})

export const {
    setQuery,
    promptStart,
    promptSuccess,
    promptError,
    resetResponse
  } = chatSlice.actions;

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
   reducer: {
     poke: pokeSlice.reducer,
     chat: chatSlice.reducer
   },
  // optional: add a middleware
  middleware(getDefaultMiddleware){
    return getDefaultMiddleware({serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['poke']}}).prepend(listenerMiddleware.middleware)
  }, 
} );