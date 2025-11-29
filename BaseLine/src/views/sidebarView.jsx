import { dishType, menuPrice, sortDishes } from "../utilities";
import "/src/style.css"

export function SidebarView(props){
    return (
        <div>
            <button onClick = {minusACB} disabled = {props.number<=1? true : false}>-</button>{props.number}<button onClick = {plusACB}>+</button>
            <table>
                <tbody>
                    {sortDishes(props.dishes)?.map(dinnerTableRowCB)}
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td class="numberAlign">{(menuPrice(props.dishes)*props.number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
    function dinnerTableRowCB(dishe){
        return <tr key={dishe.id}>
                 <td><button onClick = {deleteACB}>x</button></td>
                 <td><a href="#/details" onClick = {dishACB}>{dishe.title}</a></td>
                 <td>{dishType(dishe)}</td>
                 <td class="numberAlign">{(dishe.pricePerServing*props.number).toFixed(2)}</td>
               </tr>;
        function dishACB(evt){props.iWantFood(dishe);}
        function deleteACB(evt){props.notWantFood(dishe);}
    }

    function minusACB(evt){props.onNumberChange(props.number - 1);}
    function plusACB(evt){props.onNumberChange(props.number + 1);}
}
