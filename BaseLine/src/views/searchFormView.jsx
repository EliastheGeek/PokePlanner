export function SearchFormView(props) {
    return (
        <div>
            <input value={props.text || ""} onChange = {setSearchTextACB}/>
            <select value={props.type || ""} onChange = {setSearchTypeACB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(dishTypeOptionSelectCB)}
            </select>
            <button onClick = {searchSubmitACB}>Search!</button>
            <button style={{float: "right"}} onClick = {function relocateACB() {window.location.hash="#/summary";}}>Summary</button>
        </div>

    );

    function dishTypeOptionSelectCB(type){
        return <option key={type} value={type}>{type}</option>;
    }

    function setSearchTextACB(evt) {
        props.textEvent(evt.target.value);
    }

    function setSearchTypeACB(evt) {
        props.selectEvent(evt.target.value);
    }

    function searchSubmitACB() {
        props.searchEvent();
    }
    
}