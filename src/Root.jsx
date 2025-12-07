import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { DamageCalculator } from "/src/presenters/damageCalcPresenter.jsx";
import { ChatInterface } from "/src/views/chatInterface.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider, UNSAFE_RemixErrorBoundary } from "react-router-dom";
import {useSelector} from "react-redux"
import "./style.css";

function makeRouter() {
  return createHashRouter([
{
      path: "/",
      element: (
            <div className="layout-grid">
                <Team />
                <ChatInterface />
            </div>
      ),
    },
    {
      path: "/login",
      element: <Login />,
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
      element: (
        <div>
            Damage calc
        </div>
      ),
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

    // Checks if user is underfined, then sees if persistance is done (ready?), true -> normal render, false -> suspensview.

    return user === undefined ? (<SuspenseView promise="dummyPromise" />) :
        (ready ? 
            (<div>
                <MenuBar />
                <RouterProvider router={makeRouter()} />
            </div>):
            (<SuspenseView promise="dummyPromise" />));
}