import React from "react";
import "../App.css";
import { Link, Outlet } from "react-router-dom";

function Profile() {
  const userId = JSON.parse(localStorage.getItem("loggedIn"));
  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="profile-component">
      <div className="profile-container">
        <div className="profile-div">
          <div className="logged-in">
            <div className="loggedinheading">LOGGED IN</div>
            <div className="addressInput">
              {user[userId.id].name.toUpperCase()}
            </div>
          </div>
          <div className="accountSettings">
            <div className="account-section">
              <i className="fa fa-user" aria-hidden="true"></i>Account Settings
            </div>
            <div className="list">
              <ul>
                <Link to="account" className="link">
                  <li style={{ listStyleType: "none" }}>Profile Information</li>
                </Link>
                <Link to="address" className="link">
                  <li style={{ listStyleType: "none" }}>Manage Address</li>
                </Link>
                <Link to="recipe" className="link">
                  <li style={{ listStyleType: "none" }}>Manage Recipes</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="account-details">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
