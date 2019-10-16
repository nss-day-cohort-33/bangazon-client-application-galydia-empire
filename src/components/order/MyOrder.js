import React, { useEffect, useState } from "react"
// import "../home/orderlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import PaymentType from "./PaymentType"

const MyOrder = props => {
    const [orders, setOrders] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    //Author: Joy Ittycheriah
    //Purpose: Shows an existing order for the user and allows them to cancel that order if they choose to do so.
    //Methods: Display an existing order and display all products for that order.

    const getOrders = () => {
        if (isAuthenticated()) {
            fetch("http://localhost:8000/orders", {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                    setOrders(response))
        }
    }
    useEffect(getOrders, [])

    const deleteOrder = (id) => {
        fetch(`http://localhost:8000/orders/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(getOrders)
    }

    return (
        <>
            {orders.length > 0 ?
                <article className="orderList">
                    {
                        orders.map(order => {
                            return <section className="orderList">
                                <h3>Order Number | {order.id}</h3>
                                <button onClick={() => {
                                    console.log(order.id)
                                    deleteOrder(order.id)
                                }}>Cancel Order</button>
                            </section>
                        })
                    }
                </article>
                : ""}
        </>
    )
}

export default MyOrder