import React, { useEffect, useState, useRef } from "react"
import Product from "../cards/Product"
import { Link } from "react-router-dom"
import "./productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const SearchProduct = props => {
    const [products, setProductLocations] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const search_products = useRef()


    //Author: Sam Birky
    //Purpose: Fetches 20 products to user as a card with name displayed
    //Methods: Maps over 20 product objects and displays it to the DOM as a link that sends user to the product details page. Reverses those 20 products in setProducts to display newest to oldest

    const fetchProductLocation = () => {
        if (isAuthenticated()) {
            let search_location = search_products.current.value

            fetch(`http://localhost:8000/products?location=${search_location}`, {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setProductLocations(response.reverse()))
        }
    }
    useEffect(fetchProductLocation, [])

    const userSearchLocation = () => {
        let search_location = search_products.current.value
        products.map(product =>{
            if (product.location === search_location)
            return( <Product key={product.id} product={product} /> )
            props.history.push(`/location/${search_location}`)
        })
    }

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

export default SearchProduct

