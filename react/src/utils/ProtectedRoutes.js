import {useAuth} from "./AuthContext";
import {Navigate, Outlet} from "react-router-dom";


// vena page valata redirect venne na user authenticate venne nethuva.eka handle krnva,meka app.js ekatath danna oni.
const ProtectedRoutes=()=>{
   const {isAuthenticated}= useAuth();

   if (isAuthenticated){
       return <Outlet/>
   }else{
    return <Navigate to="/login"/>
   }
}

export default ProtectedRoutes;