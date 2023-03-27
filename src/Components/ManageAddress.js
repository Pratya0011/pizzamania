import React, { useState, useEffect } from "react";

function ManageAddress() {
  const userId = JSON.parse(localStorage.getItem("loggedIn"));
  const user = JSON.parse(localStorage.getItem("userData"));

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [displayField, setDisplayField] = useState("hidden");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (!user[userId.id].address.length) {
      setDisplayField("show");
    }
  }, [displayField]);

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
      setDisplayField("hidden");
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
      setDisplayField("hidden");
    }
  };
  const removeAddress = (id) => {
    if (user[userId.id].address.length > 1) {
      const data = user[userId.id].address.filter((data) => data.id !== id);
      user[userId.id].address = data;
      localStorage.setItem("userData", JSON.stringify(user));
      setArr([]);
    } else {
      user[userId.id].address = arr;
      localStorage.setItem("userData", JSON.stringify(user));
      setDisplayField("show");
    }
  };
  return (
    <div className="addressDetails">
      <div className="manage-address">Manage Address</div>
      <div>
        <div
          className={displayField}
          onClick={(e) => {
            setDisplayField("show");
          }}
        >
          +Add New Address
        </div>
        {displayField === "show" && (
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
                <button
                  onClick={() => {
                    setDisplayField("hidden");
                  }}
                  className="cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {user[userId.id].address.length >= 1 && (
        <div className="addressDisplay">
          {user[userId.id].address.map((data, index) => (
            <div className="addressDisplay-div" key={index}>
              <span>{data.name}</span>
              <span>{data.number}</span>
              <span
                className="delete-icon"
                onClick={() => {
                  removeAddress(data.id);
                }}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </span>
              <div>
                {data.address},{data.state} - <span>{data.pinCode}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageAddress;
