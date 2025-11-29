/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import {resolvePromise} from "/src/resolvePromise.js";
import {searchDishes, getDishDetails} from "/src/dishSource.js";

export const model = {  
    //TW1 sub-objects
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    //TW2 sub-objects
    searchParams: {},
    searchResultsPromiseState: {},
    currentDishPromiseState: {},

    //TW1 Methods
    setCurrentDishId(dishId){
        // this.someProperty= someValue
        this.currentDishId = dishId;
    },
    
    setNumberOfGuests(number){
        if (!Number.isInteger(number) || number <= 0) throw new Error("number of guests not a positive integer");
        this.numberOfGuests = number;
    },
    
    addToMenu(dishToAdd){
        // array spread syntax exercise
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            return dish.id !== dishToRemove.id;
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);
    },
    
    // more methods will be added here, don't forget to separate them with comma!
    setSearchQuery(query) {
        this.searchParams.query = query;
    },

    setSearchType(type) {
        this.searchParams.type = type;
    },

    doSearch(params) {
        const promise = searchDishes(params);
        resolvePromise(promise, this.searchResultsPromiseState);
    },

    currentDishEffect() {
        resolvePromise(undefined, this.currentDishPromiseState);

        if (this.currentDishId) {
            const promise = getDishDetails(this.currentDishId);
            resolvePromise(promise, this.currentDishPromiseState);
        }
    }
};

