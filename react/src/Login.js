import { useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useAuth} from "./utils/AuthContext";

const LoginPage = () => {

    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(event) {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        }
        axios.post("http://localhost:8080/auth/login", data)
            .then((response) => {
                login(response.data);
                navigate("/");
            }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Username:
                    <input type="text" name="username" onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                </label><br/>
                <label>Password:
                    <input type="password" id="password" name="password" onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                </label>
                <button type={"submit"}>login</button>
            </form>
        </div>
    );
}
export default LoginPage;
