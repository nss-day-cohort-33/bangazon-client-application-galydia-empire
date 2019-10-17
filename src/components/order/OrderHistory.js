import React, { useEffect, useState, useRef } from "react"
import Product from "../cards/Product"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const OrderHistory = props => {
    const [completed, setCompleted] = useState([])
    // const [paytypes, setPaytypes] = useState([])
    // const [openOrder, setOpenOrder] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    // const payment_type_value = useRef()

    const getMyCompletedOrders = () => {
        if (isAuthenticated()) {
            fetch("http://localhost:8000/orders/completed", {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                    setCompleted(response))
        }
    }

    useEffect(getMyCompletedOrders, [])

    // const getPaymentTypes = () => {
    //     if (isAuthenticated()) {
    //         fetch("http://localhost:8000/paymenttypes", {

    //             "method": "GET",
    //             "headers": {
    //                 "Accept": "application/json",
    //                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //             }
    //         })
    //             .then(response => response.json())
    //             .then((response) =>
    //                 setPaytypes(response))
    //     }
    // }
    // useEffect(getPaymentTypes, [])

    // const getMyOrder = () => {
    //     if (isAuthenticated()) {
    //         fetch("http://localhost:8000/orders/current", {

    //             "method": "GET",
    //             "headers": {
    //                 "Accept": "application/json",
    //                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //             }
    //         })
    //             .then(response => response.json())
    //             .then((response) =>
    //                 setOpenOrder(response))
    //     }
    // }
    // useEffect(getMyOrder, [])

    // const deleteOrder = (id) => {
    //     fetch(`http://localhost:8000/orders/${id}`, {
    //         "method": "DELETE",
    //         "headers": {
    //             "Accept": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //         }
    //     })
    //         .then(props.history.push("/home"))
    // }

    return (
        <>
            <h1>My Order History</h1>
            <article className="orderHistoryList">
                {
                    completed.map(eachorder => {
                        console.log("completed", completed)
                        return (eachorder.id)
                    })
                }
            </article>
        </>
    )
}

export default OrderHistory