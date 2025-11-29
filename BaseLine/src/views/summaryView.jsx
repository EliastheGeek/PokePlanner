// un-comment when needed:
import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
    return (
            <div className="debug">

              Summary for <span title="nr guests">{props.people}</span> {props.people === 1? "person" : "persons"}: 

              <button style={{float: "right"}} onClick = {function relocateACB() {window.location.hash="#/search";}}>Back to Search</button>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>unit</th>
                  </tr>
                </thead>
                <tbody>
                  { //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript
                    // Here Array Rendering is used to generate a table row for each element of the ingredients prop (an array) 
                   sortIngredients(props.ingredients)?.map(ingredientTableRowCB)
                  }
                </tbody>
              </table>
            </div>
    );
    
    /* callback for Array Rendering in TW 1.3 */
    function ingredientTableRowCB(ingr){
        return <tr key={ /* Reflect on what's a key in array rendering! */ ingr.id } >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td class="numberAlign">{(ingr.amount*props.people).toFixed(2)}</td>
                 <td>{ingr.unit}</td>
               </tr>;
    }
}

