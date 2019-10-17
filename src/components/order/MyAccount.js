import React, { useEffect, useState } from "react"
// import "../home/orderlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import PaymentType from "./PaymentType"

const MyAccount = props => {

    //Author: Joy Ittycheriah
    //Purpose: Sets up a My Account page (containing an Order History button)
    //Methods: Display a button to click to see


    return (
        <button onClick={() => {
            props.history.push("/order-history")
        }}>Cancel Order</button>
    )
}

export default MyAccount