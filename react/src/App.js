import Users from './Users'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Orders from "./Orders";
import EditOrders from "./EditOrders";
import {AuthProvider} from "./utils/AuthContext";
import LoginPage from "./Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path={"/users"} element={<Users/>}/>
                        <Route path={"/products"} element={<Products/>}/>
                        <Route path={"/orders/:id/editOrder"} element={<EditOrders/>}/>
                        <Route path={"/orders"} element={<Orders/>}/>
                        <Route path={"/"} element={<Home/>}/>
                    </Route>
                    <Route path={"/login"} element={<LoginPage/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;


// function App() {
//     return (
//         <AuthProvider>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/users" element={<Users/>}/>
//                     <Route path="/products" element={<Products/>}/>
//                     <Route path={"/orders/:id/editOrder"} element={<EditOrders/>}/>
//                     <Route path="/orders" element={<Orders/>}/>
//                     <Route path="/login" element={<LoginPage/>}/>
//                     <Route path="/" element={<Home/>}/>
//                 </Routes>
//             </BrowserRouter>
//         </AuthProvider>
//     )
// }
//
// export default App;
