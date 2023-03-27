import React, { useEffect } from "react";
import "../App.css";
import gif from "../Images/104819-tick-red.gif";

function Invoice() {
  const userId = JSON.parse(localStorage.getItem("loggedIn"));
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    user[userId.id].cart = [];
    user[userId.id].cartCount = 0;
    user[userId.id].total = 0;
    localStorage.setItem("userData", JSON.stringify(user));
  }, []);
  return (
    <div className="invoice-component">
      <div className="invoice-div">
        <span>
          <img src={gif} />
        </span>
        <span>Order Placed</span>
      </div>
      <div className="summary-div">
        <div className="summary">Order Summary</div>
        <div className="summary-total">
          Total <span>₹{user[userId.id].total}</span>
        </div>
        <div className="summary-address">
          <div>Address</div>
          <div>{user[userId.id].deliveryAddress}</div>
        </div>
        <div>
          {user[userId.id].cart.map((data, index) => (
            <div className="container-invoice" key={index}>
              <div className="order-image">
                <img src={data.image} height="150px" alt="pizza" />
              </div>
              <div className="item-details">
                <div className="item-name">{data.name}</div>
                <div className="item-size">{data.size}</div>
                <div className="item-price">₹{data.price * data.no}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Invoice;
