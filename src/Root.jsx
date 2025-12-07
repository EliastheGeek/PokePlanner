import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { DamageCalculator } from "/src/presenters/damageCalcPresenter.jsx";
import { ChatInterface } from "/src/views/chatInterface.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"
import "./style.css";

function makeRouter() {
  return createHashRouter([
    {
        path: "/",
        element: <Team />,
        children: [
            {
                path: "main",
                element: <Team />
            }
        ]
    },
    {
      path: "/team",
      element: <Team />,
    },
    {
      path: "/pokebot",
      element: <ChatInterface />,
    },
    {
      path: "/dmgcalc",
      element: <DamageCalculator />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
}
// Chat test //
export function Root(){
    const user = useSelector((state) => state.poke.user);
    const ready = useSelector((state) => state.poke.ready);
    
    if(user===undefined) return <SuspenseView promise="notEmpty" />
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
            </div>
            
        );
        return <div> <SuspenseView promise="notEmpty"/></div>
    }
}