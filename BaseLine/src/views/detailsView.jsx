import "/src/style.css"

export function DetailsView(props) {
    return (
    <div>
        <header>
            <div><button disabled={props.isDishInMenu} onClick={addDishToMenuACB}>Add to menu</button> <button onClick={function relocateACB() {window.location.hash="#/search";}}>Cancel</button></div>
            <h2>{props.dishData.title}</h2>
        </header>
        <div class="detailsDish">
            <div class="image_price">
                <img class="detailsImage" src={props.dishData.image}/>
                <aside>
                    <strong>Price: </strong>{props.dishData.pricePerServing.toFixed(2)} <br/>
                    <strong>for {props.guests} {props.people === 1? "guest" : "guests"}: </strong>{(props.dishData.pricePerServing*props.guests).toFixed(2)}
                </aside>
            </div>
            <div>
                <h3>Ingredients</h3>
                <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                    {props.dishData.extendedIngredients.map(printIngredientsCB)}
                </ul>
            </div>
            <div class="instructionsCard" dangerouslySetInnerHTML={{ __html: props.dishData.instructions }}></div>
            <br/>
            <a href={props.dishData.sourceUrl}>More information</a>
        </div>
        <br/>
    </div>

    );
    function printIngredientsCB(ingr) {
        return <li key={ingr.id}>{ingr.name+": "+ingr.amount+(ingr.unit===""?"":" "+ingr.unit)}</li>;
    }

    function addDishToMenuACB() {
        props.addDishEvent();
        window.location.hash = "#/search";
    }

}