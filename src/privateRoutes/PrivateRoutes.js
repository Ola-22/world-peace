import { Navigate } from "react-router-dom";
import { useUserAuthContext } from "../context/userAuthContext";

function PrivateRoutes({ children }) {
  const { user } = useUserAuthContext();

  JSON.parse(localStorage.getItem("user"))


  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Navigate to="/" />;
  }
  if(JSON.parse(localStorage.getItem("user"))){
    return children;
  }
  

}

export default PrivateRoutes;
