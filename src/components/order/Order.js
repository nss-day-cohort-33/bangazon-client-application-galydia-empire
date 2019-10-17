import React, { useEffect, useState, useRef } from "react"
import Product from "../cards/Product"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const Order = props => {
    const [cart, setCart] = useState([])
    const [paytypes, setPaytypes] = useState([])
    const [openOrder, setOpenOrder] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const payment_type_value = useRef()

    const getMyCart = () => {
        if (isAuthenticated()) {
            fetch("http://localhost:8000/orders/cart", {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setCart(response.reverse()))
        }
    }
    useEffect(getMyCart, [])

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
                setPaytypes(response))
        }
    }
    useEffect(getPaymentTypes, [])

    const getMyOrder = () => {
        if (isAuthenticated()) {
            fetch("http://localhost:8000/orders/current", {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                    setOpenOrder(response))
        }
    }
    useEffect(getMyOrder, [])

    const deleteOrder = (id) => {
        fetch(`http://localhost:8000/orders/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(props.history.push("/"))
    }

    const editOrder = (payment_type) => {
        if (payment_type) {
        fetch(`http://localhost:8000/orders/${openOrder.id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "payment_type": payment_type
            })
        })
            .then(() => {
                alert("Congrats on all the STUFF")
                props.history.push("/")
            })
        }
        else {
            alert("Must choose payment method!")
        }
    }

    return (
        <>
        <h1>My Open Order</h1>
                <article className="cartList">
                {
                        cart.map(product =>{
                                return( <Product key={product.id} product={product} /> )
                        })
                }
                </article>
                <fieldset>
                    <label htmlFor="payment_type_value">payment_type:  </label>
                    <select ref={payment_type_value} id = "payment_type_name" name="payment_type" required placeholder="payment_type">
                        {/* Set default option for payment_type dropdown */}
                        <option value="">Select a payment type when ready</option>
            {
                // Map over the state of payment types
                        paytypes.map((paytype) => {
                            return (
                                <option value={paytype.id}>
                                    {paytype.merchant_name}: {paytype.account_number}
                                </option>
                        )}
                        )}
                    </select>
                </fieldset>
                <button  onClick={() => editOrder(payment_type_value.current.value)}
                >FinishOrder</button>
                <button onClick={() => {
                    deleteOrder(openOrder.id)
                }}>Cancel Order</button>
        </>
    )
}

export default Order