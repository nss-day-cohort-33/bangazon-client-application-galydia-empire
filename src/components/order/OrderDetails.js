import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Product from "../cards/Product"
// import "./ProductDetails.css"

// by MCFlyJo Hacking the Planet
const OrderDetails = props => {

    //Author: Joy Ittycheriah
    //Purpose: Shows the Products for the order link that was clicked.

    const { isAuthenticated } = useSimpleAuth();
    //Creat a state variable for single product - useState()
    const [oldcart, setOldCart] = useState([])
    //Create a state variable for quantity editting later - useState()

    const getOldCart = (orderid) => {
        console.log("order id", orderid)
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
                    setOldCart(response))
        }
    }
    useEffect(() => {

        getOldCart(props.match.params.orderId)
    }, [])




    //creat HTML representation with JSX
    return (
        <>
            <h1>Products on My Old Order</h1>
            <article className="cartList">
                {
                    oldcart.map(product => {
                        return (<Product key={product.id} product={product} />)
                    })
                }
            </article>
            {/* <button  onClick={() => editOrder(payment_type_value.current.value)}
                >FinishOrder</button> */}
            {/* <button onClick={() => {
                    deleteOrder(openOrder.id)
                }}>Cancel Order</button> */}
        </>
    )
}

export default OrderDetails