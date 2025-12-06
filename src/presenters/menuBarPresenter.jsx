import { useSelector } from "react-redux";
import MenuBarView from "/src/views/menuBarView.jsx";

export function MenuBar() {
  
  const user = useSelector((state) => state.poke.user);

  return <MenuBarView user={user} />;
}