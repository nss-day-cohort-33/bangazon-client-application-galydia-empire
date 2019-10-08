import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getCategories = () => {
    {
      console.log("Joe maybe won bet");
      fetch(`http://localhost:8000/producttypes`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      })
        .then(response => response.json())
        .then(setCategories);
      console.log(categories);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2>ProductCategories</h2>
      <div>
        {categories
          .filter(
            item =>
              item.product_set.map(item => {
                return <div>{item.name}</div>;
              }).length >= 1
          )
          .map(item => {
            return (
              <div>
                <h3>
                  {item.name} (
                  {
                    item.product_set.map(item => {
                      return <div>{item.name}</div>;
                    }).length
                  }
                  )
                </h3>
                <div>
                  {item.product_set.slice(0, 3).map(item => {
                    let itemId = +item.url.split("s/")[1];
                    return (
                      <div>
                        <Link to={`/productDetail/${itemId}`}>{item.name}</Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductCategories;
