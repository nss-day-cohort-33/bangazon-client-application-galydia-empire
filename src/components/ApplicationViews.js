import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import SellProduct from "./home/SellProduct"
// import ParkExplorer from "./home/ParkExplorer"
// import MyItinerary from "./home/MyItinerary"


const ApplicationViews = () => {
    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <img className="theClaw" src={require("./home/Ravenclaw.jpg")} alt="My common room" />
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
                path="/sell-product" render={props => {
                    return <SellProduct {...props} />
                }}
            />

            {/* <Route
                path="/products" render={props => {
                    return (
                        <>
                            <h1>Products</h1>
                            <img className="swings" src={require("./home/swings.jpeg")} alt="My Dog" />
                        </>
                    )
                }}
            /> */}

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