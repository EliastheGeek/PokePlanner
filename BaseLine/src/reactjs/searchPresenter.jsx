import { useSelector, useDispatch } from "react-redux";
import { SearchFormView } from "/src/views/searchFormView.jsx";
import { SearchResultsView} from "/src/views/searchResultsView.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { doSearch, setSearchType, setSearchQuery, setCurrentDishId } from "/src/reduxStore.js"

export function Search() {
    const dispatch = useDispatch();

    const searchParams = useSelector(
        (state) => state.dinner.searchParams
    );
    const searchResultsPromiseState = useSelector(
        (state) => state.dinner.searchResultsPromiseState
    );

    return (
        <div>
            <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
            text={searchParams.query}
            type={searchParams.type}
            searchEvent = {searchHandlerACB}
            selectEvent = {selectHandlerACB}
            textEvent = {textHandlerACB}/>
            {searchResultsPromiseState?.data? <SearchResultsView searchResults={searchResultsPromiseState.data}
            iWantDish = {dishSelectHandlerACB}/> : 
            <SuspenseView promise={searchResultsPromiseState.promise}
            error={searchResultsPromiseState.error}/>}
        </div>
        );
    function searchHandlerACB() {
        dispatch(doSearch(searchParams));
    }
    function selectHandlerACB(param) {
        dispatch(setSearchType(param));
    }
    function textHandlerACB(param) {
        dispatch(setSearchQuery(param));
    }
    function dishSelectHandlerACB(param) {
        dispatch(setCurrentDishId(param.id));
    }
};