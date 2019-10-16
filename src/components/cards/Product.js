import React from "react"
import {Link} from "react-router-dom"

const Product = props => {

    //Author: Sam Birky
    //Purpose: Show products to user as a card with name displayed
    //Methods: Takes one product objects and displays them to the DOM as a card and link that sends user to the product details page

    return (
        <>
            <section className="productList">
                <Link className="NavLink" to={`/product/${props.product.id}`}>
                <h3>{props.product.name}</h3>
                </Link>
                <button id="delete_product" onClick={() => props.deleteOrderProduct(props.product.id)}>Remove Product</button>
            </section>
        </>
    )
}

export default Product