export function LogoutView(props){
  return <button style={{float: "right"}} onClick={onLogoutEventACB}>Logout</button>;
  
  function onLogoutEventACB() {
    props.onLogout();
    window.location.hash = "#";
  }
}