import React, { useEffect, useState } from "react"
import Product from "./Product"
import "./productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const HomeProduct = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    //Author: Sam Birky
    //Purpose: Fetches 20 products to user as a card with name displayed
    //Methods: Maps over 20 product objects and displays it to the DOM as a link that sends user to the product details page. Reverses those 20 products in setProducts to display newest to oldest

    const getProductsQuantity = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/products?quantity=20`, {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setProducts(response.reverse()))
        }
    }
    useEffect(getProductsQuantity, [])

    return (
        <>
        {products.length > 0 ?
                <article className="productList">
                {
                        products.map(product =>{
                                return( <Product key={product.id} product={product} /> )
                        })
                }
                </article>
        : ""}
        </>
    )
}

export default HomeProduct

// const getProducts = () => {
    //     if (isAuthenticated()) {
    //         fetch('http://localhost:8000/products', {

    //             "method": "GET",
    //             "headers": {
    //                 "Accept": "application/json",
    //                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(setProducts)
    //     }
    // }
    // useEffect(getProducts, [])