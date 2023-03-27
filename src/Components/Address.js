import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [displayField, setDisplayField] = useState("hide");
  const [addressName, setAddressname] = useState("addressName");
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("loggedIn"));
  const user = JSON.parse(localStorage.getItem("userData"));
  let total = user[userId.id].total;
  let cartCount = user[userId.id].cartCount;

  useEffect(() => {
    if (user[userId.id].address.length === 0) {
      setDisplayField("display");
    }
  }, [displayField, user, userId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let arr = [];
    let item = {
      id: 1,
      name: name,
      number: number,
      pinCode: code,
      state: state,
      address: address,
    };
    if (!user[userId.id].address.length) {
      arr.push(item);
      user[userId.id].address = arr;
      localStorage.setItem("userData", JSON.stringify(user));
      setName("");
      setAddress("");
      setCode("");
      setNumber("");
      setState("");
      setDisplayField("hide");
    } else {
      user[userId.id].address.map((data) => {
        arr.push(data);
      });
      item.id = arr.length + 1;
      arr.push(item);
      user[userId.id].address = arr;
      localStorage.setItem("userData", JSON.stringify(user));
      setName("");
      setAddress("");
      setCode("");
      setNumber("");
      setState("");
      setDisplayField("hide");
    }
  };

  const btnHanler = (e) => {
    if (selectedAddress) {
      user[userId.id].deliveryAddress = selectedAddress;
      localStorage.setItem("userData", JSON.stringify(user));
      navigate("/Invoice");
    }
  };
  return (
    <div className="address-container">
      <div className="cart-div">
        <div className="address-div">
          <div className="logged-in">
            <div className="loggedinheading">LOGGED IN</div>
            <div className="addressInput">
              {user[userId.id].name.toUpperCase()}
            </div>
          </div>
          {user[userId.id].address.length !== 0 && (
            <div className="logged-in">
              <div className={addressName}>DELIVERY ADDRESS</div>
              {user[userId.id].address.map((data, index) => (
                <div
                  className="addressInput"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAddress(e.target.value);
                      setAddressname("addressName");
                      setDisplayField("hide");
                    } else {
                      setSelectedAddress("");
                    }
                  }}
                  key={index}
                >
                  <input
                    type="radio"
                    name="address"
                    value={`${data.name},${data.address},${data.state},${data.pinCode},  ${data.number}`}
                  />
                  <span>{data.name}</span>
                  <span>{data.number}</span>
                  <div>
                    {data.address},{data.state}-{data.pinCode}
                  </div>
                </div>
              ))}
              <div className="deliverButton">
                <button
                  onClick={(e) => {
                    btnHanler();
                  }}
                >
                  Deliver Here
                </button>
              </div>
            </div>
          )}
          <div>
            <div
              className={displayField}
              onClick={(e) => {
                setDisplayField("display");
                setAddressname("diliveryAddress");
              }}
            >
              +Add New Address
            </div>
            {displayField === "display" && (
              <div className="logged-in">
                <form onSubmit={onSubmitHandler} className="new-address">
                  <div>
                    <span>
                      <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </span>
                    <span>
                      <input
                        type="text"
                        placeholder="10 digit Mobile Number"
                        value={number}
                        onChange={(e) => {
                          setNumber(e.target.value);
                        }}
                        required
                      />
                    </span>
                  </div>
                  <div>
                    <span>
                      <input
                        type="text"
                        placeholder="Pin Code"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        required
                      />
                    </span>
                    <span>
                      <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                        required
                      />
                    </span>
                  </div>
                  <div>
                    <textarea
                      className="textarea"
                      placeholder="Complete Address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="deliverButton">
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="price-details">
          <div className="heading">PRICE DETAILS</div>
          <div className="item-value">
            <span>Price ({cartCount} item)</span>
            <span>₹{total}</span>
          </div>
          <div className="item-count">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
