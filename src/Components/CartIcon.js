import React, { useState, useContext, useEffect } from "react";
import stateContext from "./Context";
import { Link } from "react-router-dom";

function CartIcon() {
  const [cartCount, setCartCount] = useState();
  const values = useContext(stateContext);
  let userId = JSON.parse(localStorage.getItem("loggedIn"));
  let userCart = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userCart[userId.id].cart.length !== 0) {
      totalCartItems();
    } else {
      setCartCount(0);
    }
  });
  const totalCartItems = () => {
    const number = userCart[userId.id].cart.reduce((num, data) => {
      userCart[userId.id].cartCount = num + data.no;
      localStorage.setItem("userData", JSON.stringify(userCart));
      return num + data.no;
    }, 0);
    setCartCount(number);
  };
  return (
    <div className="cart-icon">
      <ul>
        <Link to="/Cart">
          <li id="cart">
            <i className="fa fa-shopping-cart"></i> {!cartCount ? 0 : cartCount}
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default CartIcon;
