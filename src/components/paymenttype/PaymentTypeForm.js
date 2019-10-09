import React, { useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// Author: Scott Silver
// Purpose: Render form when add payment option affordance is clicked
// by user and POST paymenttype to database when user clicks submit.

const PaymentTypeForm = props => {
  const merchant = useRef();
  const accountNumber = useRef();
  const expireDate = useRef();
  const createDate = useRef();
  const { isAuthenticated } = useSimpleAuth();


  const addPaymentType = () => {
    if (isAuthenticated()) {
      fetch("http://localhost:8000/paymenttypes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        },
        body: JSON.stringify({
          merchant_name: merchant.current.value,
          account_number: accountNumber.current.value,
          expiration_date: expireDate,
          created_at: createDate.current.value
        })
      })
        .then(response => response.json())
        .then(() => {
          console.log("there");
          props.history.push("/payment/options");
        });
    }
  };



return (
    <>
      <h1>Choose a Payment Option</h1>
      <form className="categoryList" onSubmit={(e) => {
        e.preventDefault()
        addPaymentType()
      }}>
        <fieldset>
          <label htmlFor="merchant">Merchant Name:</label>
          <input type="text" ref={merchant} name="merchant" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="account-number">Account Number:</label>
          <input type="text" ref={accountNumber} name="account-number" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="expire-date">Expiration Date:</label>
          <input type="month" ref={expireDate} name="expire-date" min={new Date().toISOString().slice(0,7)} required></input>
        </fieldset>
        <input type="date" ref={createDate} name="expire-date" defaultValue={new Date().toISOString().slice(0,10)} hidden></input>
        <button type="submit">Add Payment</button>
      </form>
    </>
  )
};


export default PaymentTypeForm;
