import React, { useReducer, useState, useEffect } from "react";
import "../App.css";
import list from "../list.json";

import reducer from "./Reducer";
import stateContext from "./Context";
import Dropdown from "./Dropdown";
import Home from "./Home";
import Order from "./Order";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";

import Cart from "./Cart";
import Address from "./Address";
import Invoice from "./Invoice";
import Profile from "./Profile";
import RecipeSearch from "./RecipeSearch";

import ProfileDetails from "./ProfileDetails";
import ManageAddress from "./ManageAddress";
import ManageRecipe from "./ManageRecipe";

const initialState = {
  list: list,
  route: "",
};

function Nav() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [displayIcon, setDisplayIcon] = useState("");
  const [dropDown, setDropDown] = useState(false);

  // const profileIcon=JSON.parse(localStorage.getItem('userData'))
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  useEffect(() => {
    if (loggedIn !== null) {
      if (loggedIn.id !== null) {
        setDisplayIcon(true);
      } else {
        setDisplayIcon(null);
      }
    } else {
      setDisplayIcon(null);
    }
  }, [loggedIn]);

  return (
    <>
      <Router>
        <div className="nav-bar">
          <div className="right-menu">
            <div id="name">
              <Link to="/" className="link">
                Pizza Mania
              </Link>
            </div>
            <ul>
              <Link
                className="link"
                to="/Order"
                onClick={(e) => {
                  dispatch({
                    type: "LOGGED_IN",
                    payload: {
                      route: e.target.textContent,
                    },
                  });
                }}
              >
                <li>Order</li>
              </Link>
              <Link
                className="link"
                to="/Recipe"
                onClick={(e) => {
                  dispatch({
                    type: "LOGGED_IN",
                    payload: {
                      route: e.target.textContent,
                    },
                  });
                }}
              >
                <li>Recipe</li>
              </Link>
              {displayIcon && (
                <li
                  className="profile-icon"
                  onClick={() => {
                    dropDown ? setDropDown(false) : setDropDown(true);
                  }}
                >
                  <i className="fa fa-user" aria-hidden="true">
                    {dropDown && <Dropdown />}
                  </i>
                </li>
              )}
            </ul>
          </div>
        </div>
        <stateContext.Provider value={state}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              path="/Recipe"
              element={
                <PrivateRoute>
                  <RecipeSearch />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/Order"
              element={
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/Profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            >
              <Route path="account" element={<ProfileDetails />}></Route>
              <Route path="address" element={<ManageAddress />}></Route>
              <Route path="recipe" element={<ManageRecipe />}></Route>
            </Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/Checkout" element={<Address />}></Route>
            <Route path="/Invoice" element={<Invoice />}></Route>
          </Routes>
        </stateContext.Provider>
      </Router>
    </>
  );
}

export default Nav;
