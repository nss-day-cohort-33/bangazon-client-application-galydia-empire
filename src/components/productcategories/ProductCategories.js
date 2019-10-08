import React, { useState, useEffect } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const ProductCategories  = () => {
    const [categories, setCategories] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getCategories = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/productcategories`, {
                "method": "GET",
                "headers": {
                    "Accept": "application.json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then(setCategories)
        }
    }

    useEffect(getCategories, [])
}


export default ProductCategories