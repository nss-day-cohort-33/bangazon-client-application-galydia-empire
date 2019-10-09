import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const addPaymentType = () => {
  const merchant = useRef()
  const accountNumber = useRef()
  const expireDate = useRef()
  const createDate = useRef()
  const { isAuthenticated } = useSimpleAuth()
    fetch('http://localhost:8000/paymenttypes', {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
        },
        "body": JSON.stringify({
            "merchant_name": merchant.current.value,
            "account_number": accountNumber.current.value,
            "expiration_date": expireDate,
            "created_at": createDate.current.value

        })
    })
        .then(response => response.json())
        .then(() => {
            console.log("there")
            props.history.push("/payment/options")
        })
}