import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { pokemonConst } from "./pokemonConst";
const teamMaxSize = 6;
const initialState = {
    team: [pokemonConst],
    /*currentGameVersion: null,*/ //vilken version användaren har valt, avgör vilka pokemon och moves som finns tillgängliga
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
       /* setCurrentGameVersion(state, action){
            state.currentGameVersion = action.payload;
            state.currentDishPromiseState = { promise: null, data: null, error: null };
        },*/
        addToTeam(state, action){ //Lägg till ny pokemon till laget, max antal är 6
            if(state.team.length()<teamMaxSize){state.team = [...state.team,action.payload];}
            
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