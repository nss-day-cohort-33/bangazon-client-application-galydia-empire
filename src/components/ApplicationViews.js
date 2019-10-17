import { Route, withRouter, Redirect } from "react-router-dom";
import React from "react";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProductCategories from "./productcategories/ProductCategories";
import HomeProduct from "./home/HomeProduct";
import SellProduct from "./home/SellProduct";
import ProductDetails from "./product/ProductDetails";
import Profile from "./profile/Profile";
import PaymentTypeForm from "./paymenttype/PaymentTypeForm";
import CategoryView from "./category/CategoryView"
import MySettings from "./settings/MySettings";
import PaymentTypes from "./paymenttype/PaymentTypes";
import ProductList from "./product/ProductList"
import Order from "./order/Order";
import MyAccount from "./order/MyAccount";
import OrderHistory from "./order/OrderHistory";


const ApplicationViews = () => {
  const { isAuthenticated } = useSimpleAuth();

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          if (isAuthenticated()) return <HomeProduct {...props} />;
          else return <Redirect to="/login" />


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
        exact
        path="/profile"
        render={props => {
          if (isAuthenticated()) return <Profile />;
          else return <Redirect to="/login" />;
        }}
      />

      <Route
        exact
        path="/settings"
        render={props => {
          if (isAuthenticated()) return <MySettings />;
          else return <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/paymenttypes"
        render={props => {
          if (isAuthenticated()) return <PaymentTypes />;
          else return <Redirect to="/login" />;
        }}
      />

      <Route
        exact
        path="/myproducts"
        render={props => {
          if (isAuthenticated()) return <ProductList {...props} />;
          else return <Redirect to="/login" />;
        }}
      />

      <Route
        exact
        path="/payment/create"
        render={props => {
          if (isAuthenticated()) return <PaymentTypeForm {...props} />;
          else return <Redirect to="/login" />;
        }}
      />

      <Route
        path="/sell-product"
        render={props => {
          return <SellProduct {...props} />;
        }}
      />

      <Route

        path="/orders"
        render={props => {
          return <Order {...props} />;
        }}
      />

      <Route
        exact
        path="/my-account"
        render={props => {
          if (isAuthenticated()) return <MyAccount {...props} />;
          else return <Redirect to="/login" />;
        }}
      />

      <Route

        path="/orderhistory"
        render={props => {
          return <OrderHistory {...props} />;
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

      <Route
        exact path="/category/:categoryId(\d+)" render={props => {
          let categoryId = +props.match.params.categoryId
          return <CategoryView {...props} categoryId={categoryId} />
        }}
      />

    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
