
import React, { useState, useEffect, useRef } from "react"

// import getProduct from "../product/ProductDetails"

// Author: Jeff Hill
// Purpose: Display add new product form to add new product to database
// Methods: GET, POST

const SellProduct = props => {
    const category_value = useRef()
    const name = useRef()
    const price = useRef()
    const description = useRef()
    const quantity = useRef()
    const location = useRef()
    const [categoryList, setCategoryList] = useState([])


    useEffect(() => {
        // Fetch the data from localhost:8000/producttypes
        fetch("http://localhost:8000/producttypes", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        // Convert to JSON
        .then(response => response.json())
        // Store product category names in state variable
        .then(setCategoryList)
    }, [])


    const addNewProductForSale = (event) => {
        event.preventDefault()
        if (category_value.current.value == "") {
            alert("Please select a Product Category")
        }
        else {
        let today = new Date();
        let dd = today.getDate()
        let mm = today.getMonth()+1
        let yyyy = today.getFullYear()
            if (price.current.value > 10000) {
                alert("Price May Not Be Over $10,000")

            } else {
        fetch("http://localhost:8000/products", {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "description": description.current.value,
                "quantity": quantity.current.value,
                "price": price.current.value,
                "location": location.current.value,
                "created_at": `${yyyy}-${mm}-${dd}`,
                "product_type": category_value.current.value,

            })
        })
            .then(response => response.json())
            .then(() => {
                console.log("Added")
                alert("Your Product Has Been Added")
                props.history.push("/")
            })
        }
    }
    }

    return (
        <>
        {/* Form for adding a new product to sell */}
                <div>
                    <form>
                        <h2>Add A Product to Sell</h2>
                        <fieldset className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input
                            ref={name}
                            type="text"
                            required
                            className="form-control"

                            id="productName"
                            placeholder="Product Name"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                            ref={description}
                            type="textarea"
                            required
                            className="form-control"

                            id="description"
                            placeholder="Describe Your Product"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                            ref={quantity}
                            type="number"
                            name= "quantity"
                            required
                            className="form-control"
                            id="quantity"
                            placeholder="Quantity"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                            ref={price}
                            type="number"
                            name= "price"
                            required
                            className="form-control"
                            id="price"
                            placeholder="Price"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                            ref={location}
                            type="text"
                            name= "location"
                            required
                            className="form-control"
                            id="location"
                            placeholder="location"
                            />
                            </fieldset>
                                <fieldset>
                                    <label htmlFor="category">Category:  </label>

                                    <select ref={category_value} id = "category-name" name="category" required placeholder="Category">
                                        {/* Set default option for category dropdown */}
                                        <option value="">Please select a category</option>
                            {
                                // Map over the state of product types i.e. categories and set the id and name for each option in the category dropdown
                                        categoryList.map((category) => {
                                            return (
                                                <option value={category.id}>
                                                    {category.name}
                                                </option>
                                            )

                                        })
                                    }
                                    </select>
                                </fieldset>
                            <button
                            type="submit"
                            onClick={addNewProductForSale}
                            className="btn btn-primary"
                            >
                            Sell Product
                            </button>
                    </form>
                    </div>
            </>
    )
}
export default (SellProduct)