const reducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        route: action.payload.route,
      };
  }
};

export default reducer;
