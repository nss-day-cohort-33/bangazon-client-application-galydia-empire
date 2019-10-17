import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import "./ProductDetails.css"

// by MCFlyJo Hacking the Planet
const OrderDetails = props => {
    const { isAuthenticated } = useSimpleAuth();
    //Creat a state variable for single product - useState()
    const [product, setProduct] = useState([])
    //Create a state variable for quantity editting later - useState()

    const getProduct = (prodId) => {
        // Fetch the data from localhost:8000/product
        fetch(`http://localhost:8000/products/${prodId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store itinerary items in state variable
            .then((theProduct) => {
                setProduct(theProduct)
            }, [])
    }
    // Creat useEffect()
    useEffect(() => {
        getProduct(props.productId)
    }, [])

    const addToOrder = (prodId) => {
        if (isAuthenticated()) {

            fetch("http://localhost:8000/orders", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                },
                "body": JSON.stringify({
                    "product_id": prodId
                })
            })
                .then(response => response.json())
                .then(() => {
                    props.history.push("/orders");

                })
        }
    }


    //creat HTML representation with JSX
    return (
        <>
            <h1>Product Details</h1>
            <div className="ProductDetails">
                <h2>{product.name}</h2>
                <h3>{product.description}</h3>
                <h3>stock: {product.quantity}</h3>
                <h3>Price: ${product.price}</h3>

                <button id={product.id} onClick={() => addToOrder(product.id)}
                >Add to Order</button>
            </div>
        </>
    )
}

export default OrderDetails