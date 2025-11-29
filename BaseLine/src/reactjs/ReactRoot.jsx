import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Login } from "./loginPresenter.jsx";
import { Logout } from "./logoutPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"

function makeRouter(){
    return createHashRouter([
    {
        path: "/",
        element: <Search />,
        children: [
            {
                path: "search",
                element: <Search />
            }
        ]
    },
    {
        path: "/summary",
        element: <Summary />,
    },
    {
        path: "/details",
        element: <Details />,
    }
])
}

export function ReactRoot(){
    const user = useSelector((state) => state.dinner.user);
    const ready = useSelector((state) => state.dinner.ready);
    
    if(user===undefined) return <SuspenseView  promise="notEmpty" />
    if(user===null) return <Login/>
    else 
    {   
        if (ready) return (
            <div class="flexParent">
                <div class="sidebar"><Sidebar /></div>
                <div class="mainContent">
                    <RouterProvider router={makeRouter()}/> 
                    <Logout/>
                </div>
            </div>
        );
        return <div><Logout/> <SuspenseView promise="notEmpty"/></div>
    }
}

