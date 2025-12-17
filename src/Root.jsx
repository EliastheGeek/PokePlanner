import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { MainLayout } from "/src/presenters/mainLayout.jsx";
import { DamageCalculator } from "/src/presenters/damageCalcPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { MainDetailsLayout } from "/src/presenters/mainDetailsLayout.jsx";
import { createHashRouter, RouterProvider, UNSAFE_RemixErrorBoundary } from "react-router-dom";
import { useSelector } from "react-redux"
import "./style.css";

function makeRouter() {

    return createHashRouter([
    {
        path: "/",
        element: (
            <div className="mainView">
                <MainLayout />
            </div>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/team",
        element: (
            <div className="mainView">
                <MainLayout />
            </div>
        ),
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
        element: (
                <div className="mainDetailsView">
                    <MainDetailsLayout />
                </div>
        ),
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