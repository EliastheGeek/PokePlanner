import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { pokemonConst } from "./pokemonConst";
import { searchPokemon } from "./pokemonSource";
const teamMaxSize = 6;
const initialState = {
    team: [pokemonConst,],
    currentPokemonName: null, //för att söka pokemon
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
        currentPokemon(state,action){
            state.currentPokemonName = action.payload.name;
        },
        //Search
         setSearchQuery(state, action) {
            state.searchParams.query = action.payload;
        },
        doSearch(state, action) {
            state.searchParams = action.payload;
            state.searchResultsPromiseState = { promise: null, data: null, error: null };
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
    }
});

export const {
    addToTeam,
    removeFromTeam,
    currentPokemon,
    setSearchQuery,
    setUser,
    doSearch,
    setReady,
    fillFirestore,
    setCurrentEmail,
    setCurrentPassword,
    searchStarted,
    searchResolved,
    searchRejected,
} = pokeSlice.actions;

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
   reducer: {
     poke: pokeSlice.reducer,
   },
  // optional: add a middleware
  middleware(getDefaultMiddleware){
    return getDefaultMiddleware({serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['poke']}}).prepend(listenerMiddleware.middleware)
  }, 
} );

listenerMiddleware.startListening(
  {
  type: 'poke/doSearch',
  effect(action, store){  
    const params = action.payload;

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
})
/*
listenerMiddleware.startListening(
  {
  type: 'dinner/setCurrentDishId',
  effect(action, store){  
    const dishId = action.payload;

    if(!dishId) return;

    const promise = getDishDetails(dishId);
    store.dispatch(currentDishStarted(promise))
    
    if (!promise) return;
    promise
        .then((data) => {
            store.dispatch(currentDishResolved({promise,data}));
        })
        .catch((error) => {
            store.dispatch(currentDishRejected({promise,error}));
        })
  }
})*/