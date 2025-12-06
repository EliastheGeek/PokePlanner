import { Summary } from "/src/presenters/summaryPresenter.jsx";
import { Login } from "/src/presenters/loginPresenter.jsx";
import { Logout } from "/src/presenters/logoutPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {useSelector} from "react-redux"
import { MenuBar } from "/src/presenters/menuBarPresenter.jsx";






export function Root() {
  return (
    <div className="flex h-full w-full flex-col">
      <MenuBar />
      <div className="h-[900px]">
      </div>
    </div>
  );
}

