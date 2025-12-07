import "/src/style.css"

export function DetailsView(props) {//skicka in en pokemon singular

    function backToTeamACB(){
        window.location.hash = "#/team";
    }
    return (
    <div>
        <button className="pokeBotBox" onClick={backToTeamACB}>Back to team builder</button>
        <header>
            
            
            <h2>{props.pokemon.name}</h2>
            <img src={props.pokemon.sprites?.front_default}/>
        </header>
        <div>
            <div>
                
                <aside>
                <h3>Stats:</h3>
                <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                    {props.pokemon.stats?.map(printBaseStatsCB)}
                </ul>
                </aside>
            </div>

            <div>
                <h3>Tera Type:</h3>
                    <ul style={{ paddingLeft: 0, lineHeight: 1.4 }}>
                        {props.pokemon.types?.map(printTeraTypesCB)}
                    </ul>
            </div>
            <br/>

        </div>
        <br/>
    </div>

    );
    function printBaseStatsCB(stats) {
        return <li key={stats.stat.name}>{stats.base_stat+" "+stats.stat.name}</li>;
    }
    function printTeraTypesCB(types) {
        return <li key={types.type.name}>{types.type.name}</li>;
    }

    function addDishToMenuACB() {
        props.addDishEvent();
        window.location.hash = "#/search";
    }

}