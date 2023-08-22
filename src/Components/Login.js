import React, { useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import stateContext from "./Context";
import {compare} from 'bcryptjs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState("active");
  const state = useContext(stateContext);
  const navigate = useNavigate();


  const onSubmitHandler =async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setDisplay("deActive");
      return;
    }
  
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    if (!userData) {
      setDisplay("deActive");
      return;
    }
  
    const matchingUser = userData.find((data) => data.username === username);
  
    if (!matchingUser) {
      setDisplay("deActive");
      return;
    }
  
    try {
      const passwordMatch = await compare(password, matchingUser.password);
  
      if (passwordMatch) {
        const loggedIn = {
          isLoggedIn: true,
          id: matchingUser.id,
        };
  
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  
        navigate("/");
        window.location.reload();
        toast.success("Login Success");
      } else {
        setDisplay("deActive");
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      setDisplay("deActive");
    }
  };
  return (
    <>
      <div className="login-div">
        <div className="login">
          <h2>Login to Continue</h2>
          <div className={display}>Invalid Credentials</div>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <button type="submit">Login</button>
          </form>
          <ToastContainer position="top-right"autoClose={3000}theme="light" />
          <p
            onClick={(e) => {
              navigate("/SignUp");
            }}
          >
            Create Account
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
