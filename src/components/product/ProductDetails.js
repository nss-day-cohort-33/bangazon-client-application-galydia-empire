import React, { useEffect, useState } from "react"
// import "./ProductDetails.css"

// by MCFlyJo Hacking the Planet
const ProductDetails = props => {

    //Creat a state variable for single product - useState()
    const [product, setProduct] = useState([])
    //Create a state variable for quantity editting later - useState()
    // const [currentProduct, setCurrentProduct] = useState({})

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

    // const deleteProduct = product => {
    //     fetch(`http://localhost:8000/products/${product.id}`, {
    //         "method": "DELETE",
    //         "headers": {
    //             "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //         }
    //     })
    //         .then(() => {
    //             props.history.push({
    //                 pathname: "/" //Where to go after product deleted. Home? tbd
    //             })
    //         })
    // }

// Creat useEffect()
    useEffect(() => {
        getProduct(props.productId)}, [])

    // Rough draft of quantity update for later
    // const updateProductQuantity = (quantity) => {
    //     fetch(`http://localhost:8000/products/${currentProduct.id}`, {
    //         "method": "PUT",
    //         "headers": {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getProduct("bangazon_token")}`
    //         },
    //         "body": JSON.stringify({
    //             "quantity": quantity
    //         })
    //     })
    //         .then(() => {
    //             console.log("Updated!!!! YAY!!!!  🙌🏼")
    //             toggleDialog(false)
    //         })
    //         .then(getProduct)
    // }

    //creat HTML representation with JSX
    return (
        <>
        <h1>Product Details</h1>
        <div className="ProductDetails">
            <h2>{product.name}</h2>
            <h3>{product.description}</h3>
            <h3>stock: {product.quantity}</h3>
            <h3>Price: ${product.price}</h3>

                    <button onClick={() => {
                        // setCurrentProduct(product)
                        console.log("well on the way to adding to order!")
                        // toggleDialog(true)
                    }}>Add to Order</button>
        </div>
        </>
    )
}

export default ProductDetails