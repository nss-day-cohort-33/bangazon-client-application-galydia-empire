import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getCategories = () => {
    {
      fetch("http://localhost:8000/producttypes", {
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
          {/* filters categories for ones with at least one product so
         that categories with no products will display.  */}
        {categories
          .filter(
            category =>
              category.product_set.map(cat => {
                return <div>{cat.name}</div>;
              }).length >= 1
          )
          .map(item => {
            let catId = +item.url.split("s/")[1];
            return (
              <div>
            {/* renders product category name */}
                <h3>
                <Link to={`/category/${catId}`}>{item.name}</Link> (
                  {
                    item.product_set.map(item => {
                      return <ul>{item.name}</ul>
                      ;
                    }).length
                  }
                  )
                </h3>
                {/* renders prouct name by category and uses slice to select indices 0,1,2 in the array */}
                <ul>
                  {item.product_set.slice(0, 3).map(item => {
                    let itemId = +item.url.split("s/")[1];
                    return (
                      <div>
                        <Link to={`/product/${itemId}`}>{item.name}</Link>
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductCategories;
