import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomeProduct from "./home/HomeProduct"
import ProductDetails from "./product/ProductDetails"
import CategoryView from "./category/CategoryView"


const ApplicationViews = () => {
    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return (
                    <>
                    <HomeProduct {...props} />
                    </>
                    )
                }}
            />

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route
                exact path="/product/:productId(\d+)" render={props => {
                    let productId = +props.match.params.productId
                    return <ProductDetails {...props} productId={productId} />
                }}
            />

            <Route
                exact path="/category/:categoryId(\d+)" render={props => {
                    let categoryId = +props.match.params.categoryId
                    return <CategoryView {...props} categoryId={categoryId} />
                }}
            />

            {/* <Route
                path="/myprofile" render={props => {
                    return (
                        <>
                            <h1>My Profile</h1>
                            <img className="swings" src={require("./home/swings.jpeg")} alt="My Dog" />
                        </>
                    )
                }}
            /> */}

            <Route
                path="/paymenttypes" render={props => {
                    return (
                        <h1>Pay Me</h1>
                    )
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)