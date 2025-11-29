import { useSelector, useDispatch } from "react-redux";
import { SidebarView } from "/src/views/sidebarView.jsx";
import { setNumberOfGuests, setCurrentDishId, removeFromMenu } from "/src/reduxStore.js"

export function Sidebar(){
    const dispatch = useDispatch();

    const numberOfGuests = useSelector(
        (state) => state.dinner.numberOfGuests
    );

    const dishes = useSelector(
        (state) => state.dinner.dishes
    );
    
    return <SidebarView number={numberOfGuests}
                        dishes={dishes}
                        onNumberChange={setPeopleACB}
                        iWantFood={selectDishACB}
                        notWantFood={deleteDishACB}/>;
    function setPeopleACB(param) {
        dispatch(setNumberOfGuests(param));
    } 
    function selectDishACB(param) {
        dispatch(setCurrentDishId(param.id));
    }
    function deleteDishACB(param) {
        dispatch(removeFromMenu(param));
    } 
};