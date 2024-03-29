import React, { useEffect, useState, useRef } from "react"
import OrderProduct from "../cards/OrderProduct"
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
    useEffect(() => {
        getMyOrder()
        getPaymentTypes()
        getMyCart()
    }, [])

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

    // Author: Jeff Hill
    // Purpose: Remove a product from the users cart by updating the cart order
    // Methods: PUT

    const deleteOrderProduct = (id) => {

                fetch(`http://localhost:8000/orders/cart`, {
                    "method": "PUT",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                    },
                    body: JSON.stringify({
                        "product_id": id
                    })
                })
                .then((response) =>
                setOpenOrder(response))
                .then(() => getMyCart())

            }



    return (
        <>
        <h1>My Open Order</h1>
                <article className="cartList">
                {
                        cart.map(product =>{
                                return( <OrderProduct key={product.id} product={product} deleteOrderProduct={deleteOrderProduct} />  )


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
                                <option key={paytype.id} value={paytype.id}>
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