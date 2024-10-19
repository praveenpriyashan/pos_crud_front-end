import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "./utils/AuthContext";

function EditOrders() {

    const {id} = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);
    const {isAuthenticated,jwtToken}=useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/${id}`,config)
            .then((response) => {
                console.log(response)
                setOrder(response.data);
            })
            .catch((error) => {
                console.error(error)
            })

        axios.get("http://localhost:8080/products",config)
            .then((res) => {
                setProducts(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);

    return (
        <div className={"container"}>
            <h1>Add product to oder #{id}</h1>
            {
                order &&
                <div>
                    <div className={"orderDetails"}>
                        <div className={"d-flex align-items-center justify-content-between"}>
                            <div className={"dateTime"}>
                                date and time : {order.orderDate}
                            </div>
                            <div className={"totalPrice"}>
                                <h3>Total price : Rs.{order.totalPrice}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-9"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.orderProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <button className={"btn btn-danger btn-sm"} onClick={() => {
                                                axios.delete(`http://localhost:8080/orders/${id}/products/${product.id}`,config)
                                                    .then((res) => {
                                                        setOrder(res.data);
                                                        console.log(res);
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    })
                                            }}>remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={"col-lg-3"}>
                            <div className={"products"}>
                                {
                                    products && products.map((product, index) => (
                                        <div className="product p-3 bg-light shadow-sm mb-3 rounded" key={index}>
                                            <h5>{product.name}</h5>
                                            <div>Rs. {product.price}</div>
                                            <button type="button" className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => {
                                                        const data = {
                                                            productId: product.id,
                                                            quantity: 1
                                                        }
                                                        axios.post("http://localhost:8080/orders/" + id + "/addProduct", data,config)
                                                            .then((res) => {
                                                                setOrder(res.data);
                                                            })
                                                            .catch((err) => {
                                                                console.log(err);
                                                            })
                                                    }}>Add
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditOrders;
