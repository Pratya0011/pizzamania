import React, { useContext, useState } from "react";
import CartIcon from "./CartIcon";
import stateContext from "./Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import gif from "../Images/animation_200_lff4ablg.gif";

function Order() {
  const state = useContext(stateContext);
  let userId = JSON.parse(localStorage.getItem("loggedIn"));
  let userCart = JSON.parse(localStorage.getItem("userData"));
  const [arr, setArr] = useState();

  const buttonHandler = (name, price, id, size, image) => {
    let arr = [];
    let item = {
      Id: id - 1,
      name: name,
      price: price,
      size: size,
      no: 1,
      image: image,
    };
    if (!userCart[userId.id].cart.length) {
      arr.push(item);
      userCart[userId.id].cart = arr;
      localStorage.setItem("userData", JSON.stringify(userCart));
      setArr(arr);
      toast.success("Added to cart");
    } else {
      userCart[userId.id].cart.map((data) => {
        if (item.Id === data.Id) {
          item.no = data.no + 1;
        } else {
          arr.push(data);
        }
        return arr;
      });
      arr.push(item);
      userCart[userId.id].cart = arr;
      localStorage.setItem("userData", JSON.stringify(userCart));
      setArr(arr);
      toast.success("Added to cart");
    }
  };

  return (
    <div className="order-component">
      <stateContext.Provider value={{ userCart, userId }}>
        <CartIcon />
      </stateContext.Provider>

      <div className="order">
        {state.list.map((item, index) => (
          <div className="pizza" key={index}>
            <div>
              <img src={item.image} width="150px" height="180px" alt=""></img>
            </div>
            <div className="lebels">
              <div className="name">{item.name}</div>
              <div>{item.size}</div>
              <div className="span">
                <span className="price">₹{item.price}</span>
                <span className="button">
                  <button
                    onClick={() => {
                      buttonHandler(
                        item.name,
                        item.price,
                        item.id,
                        item.size,
                        item.image
                      );
                    }}
                  >
                    + Add
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right"autoClose={3000}theme="dark" />
      {/* <div className='logoi'>
    <div className={greenTic}>
        <span><img src={gif}/></span>
        <span>Added to Cart</span>
      </div>
      </div> */}
    </div>
  );
}

export default Order;
