import React from "react";

export const CTX = React.createContext();

const initState = {
  clickedMovie: {},
  favorites: []
  // credits: [   //! Credits features not yet implemented.
  //   {
  //     cast: [],
  //     crew: {},
  //     castIsLoading: true,
  //     castToggle: false,
  //     crewToggle: false
  //   }
  // ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MOVIE_CLICKED":
      return {
        ...state,
        clickedMovie: action.payload
      };

    case "ADDED_FAVORITE":
      return {
        ...state,
        favorites: action.payload
      };

    case "REMOVED_FAVORITE":
      return {
        ...state,
        favorites: action.payload
      };

    default:
      return state;
  }
};

const Store = props => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return (
    <CTX.Provider
      value={{
        state,
        dispatch
      }}
    >
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
