import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Product from "../cards/Product"

const OrderDetails = props => {

    //Author: Joy Ittycheriah/Entire Galydia Team--Jeff Hill, Matthew Caldwell, Sam Birky
    //Purpose: Shows the Products for the order link that was clicked.

    const { isAuthenticated } = useSimpleAuth();
    //Creat a state variable for holding the product values related to the order item of interest [Notice that the useState contains an object that contains products being defined as an array.]
    const [oldcart, setOldcart] = useState({ products: [] })

    const getOldCart = (orderid) => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/orders/carthistory?order=${orderid}`, {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                    setOldcart(response)
                )
        }
    }
    useEffect(() => {
        getOldCart(props.match.params.orderId)
    }, [])

    return (
        <>
            <h1>Products on My Old Order</h1>

            <article className="cartList">
                {
                    oldcart.products.map(product => {
                        return (<div key={product.id}><Product product={product} /></div>)
                    })
                }
                <h3>The total for this order is: $ {oldcart.total}</h3>
            </article>

        </>
    )
}

export default OrderDetails