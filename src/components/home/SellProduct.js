import React, { useState, useEffect, useRef } from "react"
import {withRouter} from "react-router-dom"

const SellProduct = props => {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        // Fetch the data from localhost:8000/itineraryitems
        fetch("http://localhost:8000/producttypes", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        // Convert to JSON
        .then(response => response.json())
        // Store itinerary items in state variable
        .then(setCategoryList)
    }, [])

    const categorySelection = (select) => {
        if(select.options[select.selectedIndex].value == ""){
            alert("Select A Category Please");
      }
    }
    return (
        <>
                <div>
                    <form>
                        <h2>Add A Product to Sell</h2>
                        <fieldset className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input
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

                                    <select onChange={() => categorySelection()} id = "category-name" name="category" required placeholder="Category">
                                        <option value="">Please select a category</option>
                            {
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
                            // onClick={this.constructNewTask}
                            className="btn btn-primary"
                            >
                            Sell Product
                            </button>
                    </form>
                    </div>
            </>
    )
}
export default withRouter(SellProduct)