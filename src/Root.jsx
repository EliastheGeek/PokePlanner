
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Landing } from "/src/presenters/landingPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { MainLayout } from "/src/presenters/mainLayout.jsx";
import { DamageCalculator } from "/src/presenters/damageCalcPresenter.jsx";
import { ChatBot } from "/src/presenters/chatPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { MainDetailsLayout } from "/src/presenters/mainDetailsLayout.jsx";
import { createHashRouter, RouterProvider, UNSAFE_RemixErrorBoundary, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import "./style.css";

function DetailsRedirect(){
    const team = useSelector((state) => state.poke.team);
    const navigate = useNavigate();

    useEffect(() => {
        if(!team || team.length === 0){
            // No team yet — send user back to team builder
            navigate("/team", { replace: true });
            return;
        }
        // Redirect to the first team pokemon's details
        navigate(`/details/${team[0].name}`, { replace: true });
    }, [team, navigate]);

    return null;
}

function makeRouter() {

    return createHashRouter([
    {
        path: "/",
        element: (
            <div className="mainView">
                <Landing />
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
        element: <DetailsRedirect />,
    },
    {
        path: "/details/:name",
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
                <header className="menuHeader">
                    <MenuBar />
                </header>
                <RouterProvider className={"backgroundColor"} router={makeRouter()} />
            </div>):
            (<SuspenseView promise="dummyPromise" />));
}