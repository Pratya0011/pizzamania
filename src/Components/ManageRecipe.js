import React, { useState } from "react";

function ManageRecipe() {
  const userId = JSON.parse(localStorage.getItem("loggedIn"));
  const user = JSON.parse(localStorage.getItem("userData"));
  const [arr, setArr] = useState([]);

  const deleteRecipe = (label) => {
    if (user[userId.id].recipe.length > 1) {
      const data = user[userId.id].recipe.filter(
        (data) => data.label !== label
      );
      user[userId.id].recipe = data;
      localStorage.setItem("userData", JSON.stringify(user));
      setArr([]);
    } else {
      user[userId.id].recipe = arr;
      localStorage.setItem("userData", JSON.stringify(user));
      setArr([]);
    }
  };
  return (
    <div className="recipeDetails">
      {!user[userId.id].recipe.length && (
        <div className="empty">
          <div>
            <img src="https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg"/>
          </div>
          <div>No Recipe Saved! Please add some</div>
        </div>
      )}
      {user[userId.id].recipe.length && <div className="saved-recipes">Saved Recipes</div>}
      {user[userId.id].recipe.map((data, index) => (
        <div className="recipeDisplay" key={index}>
          <div className="recipeDisplay-div">
            <span>
              <img src={data.image} height="50px" />
            </span>
            <span>{data.label}</span>
          </div>
          {data.ingredients.map((data, index) => (
            <div className="ingridients" key={index}>
              {index + 1}) {data.text}
            </div>
          ))}
          <div className="deleteRecipe">
            <button
              onClick={() => {
                deleteRecipe(data.label);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageRecipe;
