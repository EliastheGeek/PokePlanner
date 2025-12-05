import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { formatTimestamp } from "/src/utility";
import { pokemonConst } from "./pokemonConst";
const teamMaxSize = 6;

const initialState = {
    team: [pokemonConst],
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
        addToTeam(state, action){
            if(state.team.length()<teamMaxSize){state.team = [...state.team, action.payload];}
        },
        removeFromTeam(state,action){
            function keepPokemonCB(pokemon){
                return pokemon.id !== action.payload.id;
            }
            state.team = state.team.filter(keepPokemonCB);
        },
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
    addToTeam,
    removeFromTeam,
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
    startTime: null,
    currentQuery: "",
    currentResponse: "",
    conversation: {},
    loading: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        setSessionId(state, action) {
            state.sessionId = action.payload;
        },
        setSessionName(state, action) {
            state.sessionName = action.payload;
        },
        setCurrentQuery(state, action) {
            state.currentQuery = action.payload;
        },
        promptStart(state) {
            state.loading = true;
            state.error = null;

            if (!state.startTime) {
                state.startTime = formatTimestamp(new Date());
            }
        },
        promptSuccess(state, action) {
            state.loading = false;
            
            const responseId = action.payload.id;
            const responseText = action.payload.choices[0].message.content;

            if (!state.sessionId && state.currentQuery.trim() !== ""){
                state.sessionId = responseId;
                state.sessionName = state.currentQuery;
            }
            
            state.currentResponse = responseText;

            if (state.currentQuery.trim() !== "") {
                state.conversation[state.currentQuery] = responseText; // Update conversation
            }
        },
        promptError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetSession(state) {
            state.sessionId = null;
            state.sessionName = "";
            state.currentQuery = "";
            state.conversation = {};
            state.error = null;
            state.loading = false;
        }
    }
})

export const {
    setSessionId,
    setSessionName,
    setCurrentQuery,
    promptStart,
    promptSuccess,
    promptError,
    resetSession
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