import React, { useEffect, useState } from "react"
import Product from "../cards/Product"
import "./CategoryView.css"

// by MCFlyJo Hacking the Planet
const CategoryView = props => {

    //Creat a state variable for single product - useState()
    const [catProducts, setCatProducts] = useState([])
    //Create a state variable for quantity editting later - useState()
    // const [currentProduct, setCurrentProduct] = useState({})

    const getCategoryView = (categoryId) => {
        // Fetch the data from localhost:8000/product matching category id
        fetch(`http://localhost:8000/products?orderBy=product_type_id&equalTo=${categoryId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store itinerary items in state variable
            .then(setCatProducts)


    }

// Create useEffect()
    useEffect(() => {
        getCategoryView(props.categoryId)}, [])

//create HTML representation with JSX

    return (
        <>
        {catProducts.length > 0 ?
                <article className="productList">
                    <h1>{catProducts[0].product_type.name}</h1>
                {
                        catProducts.map(product =>{
                                return( <Product key={product.id} product={product} /> )
                        })
                }
                </article>
        : ""}
        </>
    )
}

export default CategoryView