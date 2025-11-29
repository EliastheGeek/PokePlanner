import { useSelector } from "react-redux";
import { SummaryView } from "/src/views/summaryView.jsx";
import { shoppingList } from "/src/utilities.js";

export function Summary(){
    const numberOfGuests = useSelector(
        (state) => state.dinner.numberOfGuests
    );

    const dishes = useSelector(
        (state) => state.dinner.dishes
    );

    return <SummaryView people={numberOfGuests}
                        ingredients={shoppingList(dishes)}/>;
};
