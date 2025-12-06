import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Logout } from "/src/presenters/logoutPresenter.jsx";
import { Team } from "/src/presenters/teamPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"
import { ChatInterface } from "/src/views/chatInterface.jsx";
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
      children: [
        {
          path: "team",
          element: (
            <div className="layout-grid">
                <Team />
                <ChatInterface />
            </div>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
}
// Chat test //
export function Root(){
         
            return (
                <div>
                    <div>
                        <MenuBar/>
                    </div>
                        <div>
                            <RouterProvider router={makeRouter()}/> 
                        </div>
                    </div>
                
            );

    }