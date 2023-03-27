import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const onSubmitHandler = (e) => {
    if (password.length <= 5) {
      e.preventDefault();
      alert("Password too small");
    } else {
      let arr = [];
      let userObj = {
        id: 0,
        name: name,
        username: username,
        password: password,
        cart: [],
        cartCount: 0,
        address: [],
        recipe: [],
        deliveryAddress: "",
        total: 0,
      };
      if (password === cPassword) {
        if (JSON.parse(localStorage.getItem("userData")) === null) {
          arr.push(userObj);
          localStorage.setItem("userData", JSON.stringify(arr));
        } else {
          let dataItems = JSON.parse(localStorage.getItem("userData"));
          dataItems.map((data) => {
            userObj.id = data.id + 1;
            arr.push(data);
            return arr;
          });
          arr.push(userObj);
          localStorage.setItem("userData", JSON.stringify(arr));
        }
        alert("Account Crated Successfully");
        navigate("/Login");
      } else {
        alert("Password Donot Match");
      }
    }
  };
  return (
    <>
      <div className="login-div">
        <div className="login signup">
          <h2>Create Account</h2>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="fullName">Name:</label>
            <input
              type="text"
              id="fullName"
              value={name}
              placeholder="Enter Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={cPassword}
              placeholder="Re-Enter Password"
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
              required
            />
            <br />
            <button type="submit">Create</button>
          </form>
          <p
            onClick={(e) => {
              navigate("/Login");
            }}
          >
            Back to Login
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
