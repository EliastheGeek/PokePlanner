import { useSelector, useDispatch } from "react-redux";
import { DetailsView } from "/src/views/detailsView.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { addToMenu } from "/src/reduxStore.js"

export function Details() {
    const dispatch = useDispatch();

    const currentDishPromiseState = useSelector(
        (state) => state.dinner.currentDishPromiseState
    );

    const numberOfGuests = useSelector(
        (state) => state.dinner.numberOfGuests
    );

    const dishes = useSelector(
        (state) => state.dinner.dishes
    );

    const currentDishId = useSelector(
        (state) => state.dinner.currentDishId
    );

    return currentDishPromiseState?.data? <DetailsView dishData={currentDishPromiseState.data}
    guests={numberOfGuests}
    isDishInMenu={dishes.find(function compareIdsCB(dish) {return dish.id === currentDishId;})?true:false}
    addDishEvent = {addDishACB}/> : 
    <SuspenseView promise={currentDishPromiseState.promise}
    error={currentDishPromiseState.error}/>;

    function addDishACB() {
        dispatch(addToMenu(currentDishPromiseState.data));
    }
};