import React, { useEffect, useState } from "react"
import MyProductCard from "../cards/MyProductCard"
import "../home/productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const ProductList = props => {
    const [products, setCustomerProducts] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    //Author: Sam Birky
    //Purpose: Fetches products of user logged in
    //Methods: Maps over product objects and displays it to the DOM as a link that sends user to the product details page.

    const getProducts = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/products/myproduct`, {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setCustomerProducts(response))
        }
    }
    useEffect(getProducts, [])

    return (
        <>
        {products.length > 0 ?
                <article className="productList">
                {
                        products.map(product =>{
                                return( <MyProductCard key={product.id} product={product} {...props} getProducts={getProducts}/> )
                        })
                }
                </article>
        : ""}
        </>
    )
}

export default ProductList