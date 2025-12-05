import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { formatTimestamp } from "/src/utility";

const initialState = {
    //Promise-stuff
    searchParams: {},
    searchResultsPromiseState: { promise: null, data: null, error: null },
    currentDishPromiseState: { promise: null, data: null, error: null },

    //Persistance
    hello: "hello",
    user: undefined,
    team: [{id: 1, name: "snorlax"}, {id: 2, name: "squirtle"}],
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
    sessionId: null,
    sessionName: "",
    timeStamp: null,
    messages: [],
    loading: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        promptStart(state, action) {

            const query = action.payload;

            state.loading = true;
            state.error = null;
            
            state.messages.push({
                id: Date.now(),
                role: "user",
                content: query,
                timestamp: new Date().toISOString()
            });

            if (!state.timeStamp) {
                state.timeStamp = formatTimestamp(new Date());
                state.sessionId = 0; // TODO: Fix id generator
                state.sessionName = query;
            }
        },
        promptSuccess(state, action) {
            state.loading = false;
            
            const responseText = 
                action.payload?.choices?.[0]?.message?.content ?? "[Empty response]";

            state.messages.push({
                id: Date.now() + 1,
                role: "assistant",
                content: responseText,
                timestamp: new Date().toISOString()
            });
        },
        promptError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addMessage(state, action){
            state.messages.push(action.payload);
        },
        resetChat(state) {
            state.sessionId = null;
            state.sessionName = "";
            state.timeStamp = null;
            state.messages = [];
            state.loading = false;
            state.error = null;
        }
    }
})

export const {
    promptStart,
    promptSuccess,
    promptError,
    resetChat
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

window.store = store;
window.promptStart = promptStart;
window.promptSuccess = promptSuccess;
window.promptError = promptError;
window.resetChat = resetChat;