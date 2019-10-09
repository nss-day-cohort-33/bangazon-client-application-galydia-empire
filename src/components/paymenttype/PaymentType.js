import React from "react"
// import PaymentTypes from PaymentTypes
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const PaymentType = props => {

    //Author: Sam Birky
    //Purpose: Show products to user as a card with name displayed
    //Methods: Takes one product objects and displays them to the DOM as a card and link that sends user to the product details page

    const deletePaymentType = (id) => {
        fetch(`http://localhost:8000/paymenttype/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then("/paymenttypes")
    }
    return (
        <>
            <section className="productList">
                <h3>Merchant Name | {props.paymenttype.merchant_name}</h3>
                <h3>Account Number | {props.paymenttype.account_number}</h3>
                <h3>Expiration Date | {props.paymenttype.expiration_date}</h3>
                <h3>Created At | {props.paymenttype.created_at}</h3>
                <button onClick={(paymenttype) => {
                                deletePaymentType(paymenttype)
                            }}>Delete</button>
            </section>
        </>
    )
}

export default PaymentType