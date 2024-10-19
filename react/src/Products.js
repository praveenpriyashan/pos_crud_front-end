import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {useAuth} from "./utils/AuthContext";

function Products() {

    const [products, setProducts] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productId, setProductId] = useState("");
    const [edit, setEdit] = useState(null);
    const [categories, setCategories] = useState(null)
    const {isAuthenticated, jwtToken} = useAuth();

    function handleName(event) {
        setName(event.target.value)
    }

    function handlePrice(event) {
        setPrice(event.target.value)
    }

    function handleQuantity(event) {
        setQuantity(event.target.value)
    }

    function handleCategoryId(event) {
        setCategoryId(event.target.value)
    }

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    function getAllProduct() {
        axios.get("http://localhost:8080/products", config)
            .then((res) => {
                setProducts(res.data)
                console.log(res.data)
            }).catch((err) => {
            console.log(err);
        })
    }

    function createProduct(event) {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            quantity: quantity,
            categoryId: categoryId
        }
        axios.post("http://localhost:8080/products", data, config)
            .then((res) => {
                alert("saved")
                getAllProduct();
                setName("");
                setPrice("");
                setQuantity("");
                setCategoryId("");
            }).catch((err) => {
            console.log(err)
        })
    }

    function updateProduct(event) {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            quantity: quantity,
            categoryId: categoryId
        }

        axios.put("http://localhost:8080/products/" + productId, data, config)
            .then((res) => {
                alert("Updated")
                getAllProduct();
                setName("");
                setPrice("");
                setQuantity("");
                setCategoryId("");
                setEdit(null);
            }).catch((err) => {
            console.log(err)

        })
    }


    useEffect(() => {
        if (isAuthenticated) {
            axios.get("http://localhost:8080/products", config)
                .then((response) => {
                    console.log(response.data)
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.error(error)
                });

            axios.get("http://localhost:8080/categories", config)
                .then((response) => {
                    console.log(response.data)
                    setCategories(response.data)
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h1>products</h1>
            {
                products && products.map((product) => {
                    return (
                        <div key={product.id}>
                            {product.name} - {product.price} - {product.quantity} - {product.category?.name}
                            <button type={"button"} className={"btn btn-outline-primary btn-sm"} onClick={() => {
                                setEdit(product.id);
                                setProductId(product.id)
                                setName(product.name);
                                setPrice(product.price);
                                setQuantity(product.quantity);
                                setCategoryId(product.category.id);
                            }}>edit
                            </button>
                        </div>
                    )
                })
            }

            {!edit &&
                <div>
                    <h2>create form</h2>
                    <form onSubmit={createProduct}>
                        <div>
                            <label>name</label>
                            <input type={"text"} onChange={handleName} value={name}/>
                        </div>
                        <div>
                            <label>price</label>
                            <input type={"text"} onChange={handlePrice} value={price}/>
                        </div>
                        <div>
                            <label>quantity</label>
                            <input type={"text"} onChange={handleQuantity} value={quantity}/>
                        </div>
                        <div>
                            <label>category</label>
                            <select onChange={handleCategoryId} required>
                                <option value={categoryId}>Select category</option>
                                {
                                    categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type={"submit"} className={"btn btn-primary btn-sm"}>save</button>
                    </form>
                </div>}

            {edit &&
                <div>
                    <h2>edit form</h2>
                    <form onSubmit={updateProduct}>
                        <div>
                            <label>name</label>
                            <input type={"text"} onChange={handleName} value={name}/>
                        </div>
                        <div>
                            <label>price</label>
                            <input type={"text"} onChange={handlePrice} value={price}/>
                        </div>
                        <div>
                            <label>quantity</label>
                            <input type={"text"} onChange={handleQuantity} value={quantity}/>
                        </div>
                        <div>
                            <label>category</label>
                            <select onChange={handleCategoryId} required>
                                <option value="">Select category</option>
                                {
                                    categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type={"submit"}>save</button>
                        <button type={"button"} onClick={() => {
                            setName("");
                            setPrice("");
                            setQuantity("");
                            setCategoryId("");
                            setEdit(null);
                        }}>cansel
                        </button>
                    </form>
                </div>
            }

            <Link to={"/users"}>users</Link><br/>
            <Link to={"/"}>Home</Link><br/>
            <Link to={"/orders"}>orders</Link>
        </div>
    )

}

export default Products;





