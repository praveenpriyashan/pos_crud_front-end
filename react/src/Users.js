import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {Link} from "react-router-dom";
import {useAuth} from "./utils/AuthContext";


function Users() {

    const [users, setUsers] = useState(null);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(null);
    const {isAuthenticated,jwtToken}=useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/users",config)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    function handleUserName(event) {
        setUserName(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleEmail(event) {
        setEmail(event.target.value)
    }

    function getUsers() {
        axios.get("http://localhost:8080/users",config)
            .then((res) => {
                setUsers(res.data)
                console.log(res.data)
            })

    }

    function createUser(event) {
        event.preventDefault();
        const data = {
            username: userName,
            password: password,
            email: email
        }
        axios.post("http://localhost:8080/users", data,config)
            .then((res) => {
                alert("saved")
                getUsers();
                setUserName("");
                setPassword("");
                setEmail("");
            }).catch((err) => {
            console.log(err)
        })
    }

    function updateUser(event) {
        event.preventDefault();
        const data = {
            username: userName,
            password: password,
            email: email
        }
        axios.put("http://localhost:8080/users/" + edit, data,config)
            .then((res) => {
                getUsers();
                setEdit(null);
                alert("update user");
                setUserName("");
                setPassword("");
                setEmail("");
            }).catch((err) => {
            console.log(err)

        })

    }


    return (
        <div>
            <button type={"button"} onClick={getUsers} className={"btn btn-primary btn-sm"}>Get All Users</button>
            {
                users && users.map((user) => (
                    <div key={user.id}>
                        {user.username} - {user.email}
                        <button type={"button"} className={"btn btn-outline-primary btn-sm"} onClick={() => {
                            setEdit(user.id);
                            setUserName(user.username);
                            setPassword(user.password);
                            setEmail(user.email);
                        }}>Edit</button>
                        <button type={"button"} className={"btn btn-outline-danger btn-sm"} onClick={() => {
                            axios.delete("http://localhost:8080/users/" + user.id,config)
                                .then((res) => {
                                    getUsers();
                                    alert("delete user")
                                }).catch((err) => {
                                console.log(err)
                            })
                        }}>delete
                        </button>
                    </div>
                ))
            }
            {!edit &&
                <div>
                    <h2>create user</h2>
                    <form onSubmit={createUser}>
                        <div>
                            <label>UserName </label>
                            <input type={"text"} onChange={handleUserName} value={userName}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type={"password"} onChange={handlePassword} value={password}/>
                        </div>
                        <div>
                            <label>Email </label>
                            <input type={"email"} onChange={handleEmail} value={email}/>
                        </div>
                        <button type={"submit"} className={"btn btn-success btn-sm"}>save</button>
                    </form>
                </div>
            }


            {edit &&
                <div>
                    <h2>edit user</h2>
                    <form onSubmit={updateUser}>
                        <div>
                            <label>UserName </label>
                            <input type={"text"} onChange={handleUserName} value={userName}/>
                        </div>
                        <div>
                            <label>Password </label>
                            <input type={"password"} onChange={handlePassword} value={password}/>
                        </div>
                        <div>
                            <label>Email </label>
                            <input type={"email"} onChange={handleEmail} value={email}/>
                        </div>
                        <button type={"submit"}>update user</button>
                        <button type={"button"} onClick={() => {
                            setEdit(null);
                        }}>cancel
                        </button>
                    </form>
                </div>
            }

            <Link to={"/"}>Home</Link><br/>
            <Link to={"/products"}>product</Link><br/>
            <Link to={"/orders"}>orders</Link>
        </div>
    );

}

export default Users