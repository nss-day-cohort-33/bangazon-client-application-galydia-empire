import React, { useEffect, useState, useRef } from "react"
import Product from "../cards/Product"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const OrderHistory = props => {
    const [completed, setCompleted] = useState([])
    const { isAuthenticated } = useSimpleAuth()

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

    return (
        <>
            <h1>My Order History</h1>
            <article className="orderHistoryList">
                {
                    completed.map(eachorder => {
                        console.log("eachorder", eachorder)
                        return (
                            <Link className="NavLink" to={`/order/${eachorder.id}`}>
                                <h3>{eachorder.id}</h3>
                            </Link>)
                    })
                }
            </article>
        </>
    )
}

export default OrderHistory