import React from "react"

const MyAccount = props => {

    //Author: Joy Ittycheriah
    //Purpose: Sets up a My Account page (containing an Order History button)
    //Methods: Display a button to click to see


    return (
        <button onClick={() => {
            props.history.push("/order-history")
        }}>View Order History</button>
    )
}

export default MyAccount