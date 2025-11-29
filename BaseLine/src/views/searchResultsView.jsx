import "/src/style.css"

export function SearchResultsView(props) {
    return (
        <div>
            {props.searchResults?.map(dishPresenterCB)}
        </div>
    );

    function dishPresenterCB(dish){
        return (
            <span key={dish.id} class="dishResults" onClick={dishSelectACB}>
                <img src={dish.image} height={100}/>
                <div>{dish.title}</div>
            </span>
        );
        function dishSelectACB() {
            props.iWantDish(dish);
            window.location.hash = "#/details";
        }
    }
}