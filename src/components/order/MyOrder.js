import React, { useEffect, useState } from "react"
// import "../home/productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import PaymentType from "./PaymentType"

const MyOrder = props => {
    const [paymenttypes, setPaymentTypes] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    //Author: Joy Ittycheriah
    //Purpose: Shows an existing order for the user and allows them to cancel that order if they choose to do so.
    //Methods: Display an existing order and display all products for that order.

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
                        paymenttypes.map(paymenttype => {
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

export default MyOrder