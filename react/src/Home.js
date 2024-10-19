import {Link} from "react-router-dom";
import {useAuth} from "./utils/AuthContext";

function Home(){

    const {isAuthenticated,logout}=useAuth();
    return(
        <div>
            <h1>Home</h1>
            <p>Welcome to our home page</p>

            <Link to={"/users"}>users</Link><br/>
            <Link to={"/products"}>products</Link><br/>
            <Link to={"/orders"}>orders</Link><br/>

            {
                isAuthenticated &&
                <button type={"button"} className={"btn btn-primary"} onClick={logout}>logout</button>
            }
        </div>
    )
} 
export default Home;