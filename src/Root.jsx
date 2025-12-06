import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Logout } from "/src/presenters/logoutPresenter.jsx";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"
import {MenuBar} from "/src/presenters/menuBarPresenter.jsx";
import { ChatInterface } from "/src/views/chatInterface.jsx";
import "./style.css";

function makeRouter(){
    return createHashRouter([
    {
        path: "/",
        element: <Team />,
        children: [
            {
                path: "team",
                element: <Team />
            }
        ]
    },
])
}

export function Root(){
    const user = useSelector((state) => state.poke.user);
    const ready = useSelector((state) => state.poke.ready);
    
    if(user===undefined) return <SuspenseView  promise="notEmpty" />
    if(user===null) return <Login/>
    else 
    {   
        if (ready) return (
            <div>
                <div className="topMenuBar">
                    <MenuBar />
                </div>
                <div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <RouterProvider router={makeRouter()}/> 
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <b>PokéBot</b>
                        <ChatInterface />
                    </div>
                </div>
                <Logout/>
            </div>
            
        );
        return <div><Logout/> <SuspenseView promise="notEmpty"/></div>
    }
}