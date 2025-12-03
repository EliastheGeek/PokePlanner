import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Logout } from "/src/presenters/logoutPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"
import { ChatInputPresenter } from "/src/presenters/chatInputPresenter.jsx";
import { ChatOutputPresenter } from "/src/presenters/chatOutputPresenter.jsx";
import "./style.css";


// Chat test //
export function Root(){

    return (
        <div>
            <div className="topMenuBar">
            Menu
            </div>
            <div className="horizontalFlexParent">
                <div className="mainAreaTest">
                    main area
                </div>
                <div className="pokeBotBox">
                    <b>PokéBot</b>
                    <ChatInputPresenter />
                    <ChatOutputPresenter />
                </div>
            </div>
        </div>
        
    );
}
// ---- //


/*
function makeRouter(){
    return createHashRouter([
    {
        path: "/",
        element: <Summary />,
        children: [
            {
                path: "main",
                element: <Summary />
            }
        ]
    },
])
}

export function Root() {

    
    const user = useSelector((state) => state.poke.user);
    const ready = useSelector((state) => state.poke.ready);
    
    if(user===undefined) return <SuspenseView  promise="notEmpty" />
    if(user===null) return <Login/>
    else 
    {   
        if (ready) return (
            <div>
                <div>
                    <RouterProvider router={makeRouter()}/> 
                    <Logout/>
                </div>
            </div>
        );
        return <div><Logout/> <SuspenseView promise="notEmpty"/></div>
    }
        
}
*/

