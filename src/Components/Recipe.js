import React, { useState, useContext } from "react";
import stateContext from "./Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Recipe() {
  const recipe = useContext(stateContext);
  const [arr, setArr] = useState();
  const [dialog, setDialog] = useState("");

  let userId = JSON.parse(localStorage.getItem("loggedIn"));
  let user = JSON.parse(localStorage.getItem("userData"));

  const saveRecipe = (index, image, label, ingredients) => {
    let arr = [];

    let recipe = {
      image: image,
      label: label,
      ingredients: ingredients,
    };
    if (!user[userId.id].recipe.length) {
      arr.push(recipe);
      user[userId.id].recipe = arr;
      localStorage.setItem("userData", JSON.stringify(user));
      setArr(arr);
      toast.success("saved");
    } else {
      user[userId.id].recipe.map((data) => {
        if (recipe.label === data.label) {
          setDialog(1);
        } else {
          arr.push(data);
        }
      });
      arr.push(recipe);
      user[userId.id].recipe = arr;
      localStorage.setItem("userData", JSON.stringify(user));
      setArr(arr);
      toast.success("saved");
    }
  };

  return (
    <>
      {recipe.map((item, index) => (
        <div className="grid" key={index}>
          <div className="pic">
            <img src={item.recipe.image} alt="image not found" />
          </div>
          <div className="label">{item.recipe.label}</div>
          <div className="text">
            {item.recipe.ingredients.map((data, index) => (
              <ul key={index}>
                <li>{data.text}</li>
              </ul>
            ))}
          </div>
          <div
            className="save-recipe"
            onClick={() =>
              saveRecipe(
                index,
                item.recipe.image,
                item.recipe.label,
                item.recipe.ingredients
              )
            }
          >
            <button>Save</button>
          </div>
        </div>
      ))}
      <ToastContainer position="top-right"autoClose={3000}theme="dark" />
    </>
  );
}

export default Recipe;
