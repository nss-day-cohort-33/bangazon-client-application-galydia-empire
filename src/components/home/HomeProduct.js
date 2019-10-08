import React, { useEffect, useState } from "react"
import Product from "./Product"
import "./productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const HomeProduct = props => {
    const [products, setProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()

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
                .then(setProducts)
        }
    }
    useEffect(getProductsQuantity, [])

    return (
        <>
        <article className="productList">
            {
                products.map(product => {
                return <Product key={product.id} product={product} />})
            }
        </article>
    </>
    )
}

export default HomeProduct