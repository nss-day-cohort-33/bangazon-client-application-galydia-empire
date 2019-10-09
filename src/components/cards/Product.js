import React from "react"
import {Link} from "react-router-dom"

const Product = props => {

    return (
        <>
            <section className="productList">
                <Link className="NavLink" to={`/product/${props.product.id}`}>
                <h3>{props.product.name}</h3>
                </Link>
            </section>
        </>
    )
}

export default Product