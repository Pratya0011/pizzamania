import React, { useState } from "react";
import "../App.css";

function ProfileDetails() {
  let userId = JSON.parse(localStorage.getItem("loggedIn"));
  let user = JSON.parse(localStorage.getItem("userData"));
  const [save, setSave] = useState(true);
  const [updatedName, setUpdatedName] = useState(user[userId.id].name);
  const [toggle, setToggle] = useState("Edit");
  const [passwordEdit, setPassordEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassord] = useState("");
  const [checkPassord, setCheckPasword] = useState("");

  const onSaveHandler = () => {
    user[userId.id].name = updatedName;
    localStorage.setItem("userData", JSON.stringify(user));
    setSave(true);
    setToggle("Edit");
  };

  const toggleDiv = () => {
    if (save) {
      setToggle("cancel");
      setSave(false);
    } else {
      setToggle("Edit");
      setSave(true);
    }
  };
  const Edit = () => {
    if (passwordEdit) {
      setPassordEdit(false);
    } else {
      setPassordEdit(true);
    }
  };
  const updatePassword = (e) => {
    e.preventDefault();
    if (oldPassword !== user[userId.id].password) {
      alert("Incorrect Password");
      setOldPassword("");
    } else if (newPassword !== checkPassord) {
      setNewPassord("");
      setCheckPasword("");
      alert("Invalid Input");
    } else {
      user[userId.id].password = newPassword;
      localStorage.setItem("userData", JSON.stringify(user));
      setPassordEdit(false);
      setOldPassword("");
      setNewPassord("");
      setCheckPasword("");
    }
  };

  return (
    <div className="ProfileDetails">
      <div className="profileInformation">
        <span>Personal Information</span>
        <span onClick={toggleDiv}>{toggle}</span>
      </div>
      <div className="nameFild">
        <span>
          <input
            value={updatedName}
            disabled={save}
            onChange={(e) => {
              setUpdatedName(e.target.value);
            }}
          />
        </span>
        {!save && (
          <span>
            <button onClick={onSaveHandler}>Save</button>
          </span>
        )}
      </div>
      <div className="userNameField">
        <span>Username</span>
        <input value={user[userId.id].username} disabled={true} />
      </div>
      <div className="passwordField">
        <span>Password</span>
        <span onClick={Edit}>Edit</span>
      </div>
      {passwordEdit && (
        <div className="passwordForm">
          <form onSubmit={updatePassword}>
            <div>
              <input
                type="password"
                value={oldPassword}
                placeholder="Current Password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassord(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={checkPassord}
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setCheckPasword(e.target.value);
                }}
                required
              />
            </div>
            <span>
              <button type="submit">Update</button>
            </span>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
