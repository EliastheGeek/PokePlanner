import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { Search } from "/src/presenters/searchPresenter.jsx";
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { DamageCalculator } from "/src/presenters/damageCalcPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { Details } from "/src/presenters/detailsPresenter.jsx";
import { createHashRouter, RouterProvider, UNSAFE_RemixErrorBoundary } from "react-router-dom";
import {useSelector} from "react-redux"
import "./style.css";

function makeRouter() {
  return createHashRouter([
{
      path: "/",
      element: (
            <div className="horizontalFlexParentMain">
                <div className="teamView">
                    <div>
                        <Team />
                        <Search />
                    </div>
                </div>
                <div className="pokeBotBox">
                    <ChatBot />
                </div>
            </div>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/team",
      element: (<div className="horizontalFlexParentMain">
                    <div className="teamView">
                        <Team />
                        <Search />
                    </div>
                    <div className="pokeBotBox">
                        <ChatBot />
                    </div>
                </div>),
    },
    {
      path: "/pokebot",
      element: <ChatBot />,
    },
    {
      path: "/dmgcalc",
      element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <DamageCalculator />
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <ChatBot />
                    </div>
                </div>),
    },
    {
      path: "/details",
      element: (<div className="horizontalFlexParent">
                    <div className="mainAreaTest">
                        <div>
                            <div>
                                <Details />
                            </div>
                        </div>  
                    </div>
                    <div className="pokeBotBox">
                        <ChatBot />
                    </div>
                </div>),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
}
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