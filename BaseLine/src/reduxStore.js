import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import {searchDishes, getDishDetails} from "/src/dishSource.js";

const initialState = {
    //TW1 sub-objects
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,

    //TW2 sub-objects
    searchParams: {},
    searchResultsPromiseState: { promise: null, data: null, error: null },
    currentDishPromiseState: { promise: null, data: null, error: null },

    //Persistance
    user: undefined,
    ready: false, 

    //Authentication
    currentEmail: null,
    currentPassword: null,
};

const dinnerSlice = createSlice({
    name: "dinner",
    initialState: initialState,
    reducers: {
        //TW1 Methods
        setCurrentDishId(state, action){
            // this.someProperty= someValue
            state.currentDishId = action.payload;
            state.currentDishPromiseState = { promise: null, data: null, error: null };
        },
        setNumberOfGuests(state, action){
            if (!Number.isInteger(action.payload) || action.payload <= 0) throw new Error("number of guests not a positive integer");
            state.numberOfGuests = action.payload;
        },
        addToMenu(state, action){
            // array spread syntax exercise
            // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
            state.dishes= [...state.dishes, action.payload];
        },
        // filter callback exercise
        removeFromMenu(state, action){
            function shouldWeKeepDishCB(dish){
                return dish.id !== action.payload.id;
            }
            state.dishes= state.dishes.filter(shouldWeKeepDishCB);
        },
        // more methods will be added here, don't forget to separate them with comma!
        setSearchQuery(state, action) {
            state.searchParams.query = action.payload;
        },

        setSearchType(state, action) {
            state.searchParams.type = action.payload;
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
            const {guest, dishList, currentDish} = action.payload;
            state.numberOfGuests = guest;
            state.dishes = dishList;
            state.currentDishId = currentDish;
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

        currentDishStarted(state, action) {
            const promise = action.payload;
            state.currentDishPromiseState.promise = promise;
            state.currentDishPromiseState.data = null;
            state.currentDishPromiseState.error = null;
        },

        currentDishResolved(state, action) {
            const {promise, data} = action.payload;
            if (state.currentDishPromiseState.promise !== promise) return;
            state.currentDishPromiseState.data = data;
        },

        currentDishRejected(state, action) {
            const {promise, error} = action.payload;
            if (state.currentDishPromiseState.promise !== promise) return;
            state.currentDishPromiseState.error = error;
        },
    }
});

export const {
    setCurrentDishId,
    setNumberOfGuests,
    addToMenu,
    removeFromMenu,
    setSearchQuery,
    setSearchType,
    doSearch,
    searchStarted,
    searchResolved,
    searchRejected,
    currentDishStarted,
    currentDishResolved,
    currentDishRejected,
    setUser,
    setReady,
    fillFirestore,
    setCurrentEmail,
    setCurrentPassword,
} = dinnerSlice.actions;

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
   reducer: {
     dinner: dinnerSlice.reducer,
   },
  // optional: add a middleware
  middleware(getDefaultMiddleware){
    return getDefaultMiddleware({serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['dinner']}}).prepend(listenerMiddleware.middleware)
  }, 
} );

listenerMiddleware.startListening(
  {
  type: 'dinner/doSearch',
  effect(action, store){  
    const params = action.payload;

    const promise = searchDishes(params);
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
})