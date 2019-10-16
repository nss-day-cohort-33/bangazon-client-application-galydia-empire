import React from "react"
import {Link} from "react-router-dom"
// import getProducts from "../product/ProductList"

const MyProductCard = props => {

    //Author: Sam Birky
    //Purpose: Show products to user as a card with name displayed
    //Methods: Takes one product objects and displays them to the DOM as a card and link that sends user to the product details page
    const deleteProduct = (id) => {
        fetch(`http://localhost:8000/products/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(() =>{
                alert("Your Product Has Been Deleted")
                props.getProducts()
            })
    }

    return (
        <>
            <section className="productList">
                <Link className="NavLink" to={`/product/${props.product.id}`}>
                <h3>{props.product.name}</h3>
                </Link>
                <button onClick={() => {
                                deleteProduct(props.product.id)
                                props.history.push("/myproducts")
                            }}>Delete</button>
            </section>
        </>
    )
}

export default MyProductCard