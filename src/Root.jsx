import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { DamageCalculator } from "/src/presenters/damageCalcPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"
import "./style.css";

function makeRouter() {
  return createHashRouter([
    {
        path: "/",
        element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <Team />
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <b>PokéBot</b>
                        <ChatInterface />
                    </div>
                </div>),
        children: [
            {
                path: "main",
                element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <Team />
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <b>PokéBot</b>
                        <ChatInterface />
                    </div>
                </div>),
            }
        ]
    },
    {
      path: "/team",
      element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <Team />
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <b>PokéBot</b>
                        <ChatInterface />
                    </div>
                </div>),
    },
    {
      path: "/pokebot",
      element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <ChatInterface />
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <b>PokéBot</b>
                        <ChatInterface />
                    </div>
                </div>),
    },
    {
      path: "/dmgcalc",
      element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <DamageCalculator />
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <b>PokéBot</b>
                        <ChatInterface />
                    </div>
                </div>),
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
    if(user===null) return (
            <div>
                <div className="topMenuBar">
                    <MenuBar />
                </div>
                <RouterProvider router={makeRouter()}/> 
            </div>    
        );
    else 
    {   
        if (ready) return (
            <div>
                <div className="topMenuBar">
                    <MenuBar />
                </div>
                <RouterProvider router={makeRouter()}/> 
            </div>
            
        );
        return <div><SuspenseView promise="notEmpty"/></div>
    }
}