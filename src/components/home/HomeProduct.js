import React, { useEffect, useState, useRef } from "react"
import Product from "../cards/Product"
import { Link } from "react-router-dom"
import "./productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const HomeProduct = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const search_products = useRef()


    //Author: Sam Birky
    //Purpose: Fetches 20 products to user as a card with name displayed
    //Methods: Maps over 20 product objects and displays it to the DOM as a link that sends user to the product details page. Reverses those 20 products in setProducts to display newest to oldest

    const getProductsQuantity = (search) => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/products?location=${search}&quantity=20`, {

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
        {/* <form ref={search_products} onSubmit={(e, search_products) => {
            e.PreventDefault()
            console.log(search_products)
            getProductsQuantity(search_products.current.value)
            console.log(search_products) */}
        }}
        >
        <label htmlFor="search_products">Search for products by city</label><br></br>
        <input type="search" id="search_input" value="search_input" ref={search_products} placeholder="City"/>
        <Link to={`/location/`}><button id="search_input">Search</button></Link>
        {/* </form> */}
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