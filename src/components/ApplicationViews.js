import { Route, withRouter } from "react-router-dom";
import React from "react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProductCategories from "./productcategories/ProductCategories";
import HomeProduct from "./home/HomeProduct";
import ProductDetails from "./product/ProductDetails";
import Profile from "./profile/Profile"

const ApplicationViews = () => {
  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          return (
            <>
              <HomeProduct {...props} />
            </>
          );
        }}
      />
      <Route
        path="/register"
        render={props => {
          return <Register {...props} />;
        }}
      />

      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
        />

      <Route
        exact path="/profile" render={props => {
            if(isAuthenticated()) return (
               <Profile />
            )
            else return <Redirect to="/login" />
        }}
      />

      <Route
        path="/productcategories"
        render={props => {
          return <ProductCategories {...props} />;
        }}
      />

      <Route
        exact
        path="/product/:productId(\d+)"
        render={props => {
          let productId = +props.match.params.productId;
          return <ProductDetails {...props} productId={productId} />;
        }}
      />
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
