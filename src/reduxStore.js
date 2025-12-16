import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { formatTimestamp } from "/src/utilities";
import { pokemonConst } from "./pokemonConst";
import { searchPokemon, showAllPokemon } from "./pokemonSource";
const teamMaxSize = 6;

const initialState = {
    team: [pokemonConst,],
    currentPokemonName: pokemonConst.name, //för att söka pokemon
    open: false,
    loading: false,
    //Promise-stuff
    searchParams: {},
    searchResultsPromiseState: { promise: null, data: null, error: null },
    showPokemonPromiseState: { promise: null, data: [], error: null },

    //Persistance
    hello: "hello",
    user: undefined,
    ready: false,

    //Authentication
    currentEmail: null,
    currentPassword: null,
    authError: null,

    // Damage calculator
    damageAttackerName: "",
    damageDefenderName: "",
    damageMoveName: "",
    damageWeather: "",
    damageGameType: "Singles", // 'Singles' | 'Doubles'
    damageReflect: false,
    damageLightScreen: false,
    damageResult: null,
    damageError: null,  
};

const pokeSlice = createSlice({
    name: "poke",
    initialState: initialState,
    reducers: {
        addToTeam(state, action){
            const pokemon = action.payload;
            if (!pokemon) return;
            // avoid duplicates
            if (state.team.some(p => p?.id === pokemon?.id)){ console.log("Blocked ", pokemon); return;}
            if (state.team.length < teamMaxSize) {
                state.team = [...state.team, pokemon];
            }
        },
        addActualMove(state, action){
            console.log("Adding actual move in redux store", action.payload);
            const moveName = action.payload;
            const pokemonIndex = state.team.findIndex(p => p.name === state.currentPokemonName);
            if (pokemonIndex === -1) return;
            state.team[pokemonIndex].actualMoves = team[pokemonIndex].filter(
                            function filterCB(moves){ return moves.move.name !== moveName; }) || null;
            

        },
        removeFromTeam(state,action){
            function keepPokemonCB(pokemon){
                return pokemon?.id !== action.payload.id;
            }
            state.team = state.team.filter(keepPokemonCB);
        },
        setCurrentPokemonName(state,action){
            state.currentPokemonName = action.payload;
        },

        //Search
         setSearchQuery(state, action) {
            state.searchParams.query = action.payload;
        },
        doSearch(state, action) {
            state.searchParams = action.payload;
            state.searchResultsPromiseState = { promise: null, data: null, error: null };
        },
        showPokemon(state, action) {
            state.showPokemonPromiseState = { promise: null, data: [], error: null };
        },
        setOpen(state, action) {
            state.open = action.payload;
        },
        setOptions(state, action) {
            state.showPokemonPromiseState.data = action.payload;
        },
        //Authentication
        setCurrentEmail(state, action){
            state.currentEmail = action.payload;
        },

        setCurrentPassword(state, action){
            state.currentPassword = action.payload;
        },
        setAuthError(state, action) {
            state.authError = action.payload;
        },

        // Damage calculator
        setDamageAttackerName(state, action) {
            state.damageAttackerName = action.payload;
        },
        setDamageDefenderName(state, action) {
            state.damageDefenderName = action.payload;
        },
        setDamageMoveName(state, action) {
            state.damageMoveName = action.payload;
        },
        setDamageWeather(state, action) {
            state.damageWeather = action.payload;
        },
        setDamageGameType(state, action) {
            state.damageGameType = action.payload;
        },
        setDamageReflect(state, action) {
            state.damageReflect = action.payload;
        },
        setDamageLightScreen(state, action) {
            state.damageLightScreen = action.payload;
        },
        setDamageResult(state, action) {
            state.damageResult = action.payload;
        },
        setDamageError(state, action) {
            state.damageError = action.payload;
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
        searchStarted(state, action) {
            const promise = action.payload;
            state.searchResultsPromiseState.promise = promise;
            state.searchResultsPromiseState.data = null;
            state.searchResultsPromiseState.error = null;
        },

        searchResolved(state, action) {
            const {promise, data} = action.payload;
            if (state.searchResultsPromiseState.promise !== promise) return;
            state.searchResultsPromiseState.data = data;
        },

        searchRejected(state, action) {
            const {promise, error} = action.payload;
            if (state.searchResultsPromiseState.promise !== promise) return;
            state.searchResultsPromiseState.error = error;
        },

        showStarted(state, action) {
            const promise = action.payload;
            state.showPokemonPromiseState.promise = promise;
            state.showPokemonPromiseState.data = [];
            state.showPokemonPromiseState.error = null;
            state.loading = true;
        },

        showResolved(state, action) {
            const {promise, data} = action.payload;
            if (state.showPokemonPromiseState.promise !== promise) return;
            state.showPokemonPromiseState.data = data;
            state.loading = false;
        },

        showRejected(state, action) {
            const {promise, error} = action.payload;
            if (state.showPokemonPromiseState.promise !== promise) return;
            state.showPokemonPromiseState.error = error;
            state.loading = false;
        },
    }
});

export const {
    addToTeam,
    addActualMove,
    removeFromTeam,
    setCurrentPokemonName,

    //Search
    setSearchQuery,
    doSearch,
    showPokemon,
    setOpen,

    setUser,
    setReady,
    fillFirestore,
    setCurrentEmail,
    setCurrentPassword,
    setAuthError,
    searchStarted,
    searchResolved,
    searchRejected,
    showStarted,
    showResolved,
    showRejected,

    // Damage calculator
    setDamageAttackerName,
    setDamageDefenderName,
    setDamageMoveName,
    setDamageWeather,
    setDamageGameType,
    setDamageReflect,
    setDamageLightScreen,
    setDamageResult,
    setDamageError,
} = pokeSlice.actions;

// ---------- //
// Chat stuff //
// ---------- //

const chatInitialState = {
    sessionId: null,
    sessionName: "",
    timeStamp: null,
    includeTeam: true,
    messages: [],
    loading: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        setIncludeTeam(state, action){
            state.includeTeam = action.payload;
        },
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
        }
    }
})

export const {
    setIncludeTeam,
    promptStart,
    promptSuccess,
    promptError
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
});

listenerMiddleware.startListening(
{
    type: 'poke/doSearch',
    effect(action, store){  
        const params = action.payload;
        if(!params) return;
        const promise = searchPokemon(params);
        store.dispatch(searchStarted(promise))
        if (!promise) return;
        promise
            .then((data) => {
                store.dispatch(searchResolved({promise,data}));
            })
            .catch((error) => {
                store.dispatch(searchRejected({promise,error}));
            })
    }
}
)

listenerMiddleware.startListening(
{
    type: 'poke/showPokemon',
    effect(action, store){
        const promise = showAllPokemon();
        store.dispatch(showStarted(promise))

        if (!promise) return;
        promise
            .then((data) => {
                store.dispatch(showResolved({promise,data}));
            })
            .catch((error) => {
                store.dispatch(showRejected({promise,error}));
            })
    }
})

