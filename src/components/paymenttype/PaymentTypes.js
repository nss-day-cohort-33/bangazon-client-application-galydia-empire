import React, { useEffect, useState } from "react"
import "../home/productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import PaymentType from "./PaymentType"

const PaymentTypes = props => {
    const [paymenttypes, setPaymentTypes] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    //Author: Sam Birky
    //Purpose: Fetches 20 products to user as a card with name displayed
    //Methods: Maps over 20 product objects and displays it to the DOM as a link that sends user to the product details page. Reverses those 20 products in setProducts to display newest to oldest

    const getPaymentTypes = () => {
        if (isAuthenticated()) {
            fetch("http://localhost:8000/paymenttypes", {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setPaymentTypes(response))
        }
    }
    useEffect(getPaymentTypes, [])

    const deletePaymentType = (id) => {
        fetch(`http://localhost:8000/paymenttypes/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(getPaymentTypes)
    }

    return (
        <>
        {paymenttypes.length > 0 ?
                <article className="productList">
                {
                        paymenttypes.map(paymenttype =>{
                            return <section className="productList">
                                <h3>Merchant Name | {paymenttype.merchant_name}</h3>
                                <h3>Account Number | {paymenttype.account_number}</h3>
                                <h3>Expiration Date | {paymenttype.expiration_date}</h3>
                                <h3>Created At | {paymenttype.created_at}</h3>
                                <button onClick={() => {
                                    // console.log({paymenttype})
                                                deletePaymentType(paymenttype.id)
                                            }}>Delete</button>
                            </section>
                        })
                }
                </article>
        : ""}
        </>
    )
}

export default PaymentTypes