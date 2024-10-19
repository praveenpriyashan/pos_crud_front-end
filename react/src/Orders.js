import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "./utils/AuthContext";


function Orders() {

    const [orders, setOrders] = useState(null);
    const navigate = useNavigate();
    const {isAuthenticated, jwtToken} = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/orders", config)
            .then((response) => {
                console.log(response.data)
                setOrders(response.data);
            })
            .catch((err) => {
                console.error("Error fetching orders")
            })
    }, []);

    // function createOrder() {
    //     console.log("Creating order")
    //     axios.post("http://localhost:8080/orders",config)
    //         .then((response) => {
    //             console.log(response.data.id)
    //             navigate(`/orders/${response.data.id}/editOrder`)
    //             console.log("Order created successfully")
    //         })
    //         .catch((error) => {
    //             console.error("Error creating order", error)
    //         })
    // }

    function createOrder() {
        console.log("Creating order");
        const orderData = {
            productName: "Sample Product",
            quantity: 1
        };
        axios.post("http://localhost:8080/orders", orderData, config)
            .then((response) => {
                console.log(response.data.id);
                navigate(`/orders/${response.data.id}/editOrder`);
                console.log("Order created successfully");
            })
            .catch((error) => {
                console.error("Error creating order", error);
            });
    }

    return (
        <div className={"container"}>
            <h1>Orders</h1>
            <div className={"text-end"}>
                <button type={"button"} className={"btn btn-success"} onClick={createOrder}>create order</button>
            </div>
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>date and time</th>
                    <th>total items</th>
                    <th>total price</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.orderProducts.length}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                <button type={"button"} className={"btn btn-outline-primary"} onClick={() => {
                                    navigate(`/orders/${order.id}/editOrder`)
                                }}>edit
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Link to={"/users"}>users</Link><br/>
            <Link to={"/"}>Home</Link><br/>
            <Link to={"/products"}>product</Link>
        </div>
    )
}

export default Orders;

