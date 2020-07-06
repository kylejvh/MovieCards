import {
  ADDED_FAVORITE,
  REMOVED_FAVORITE,
  REMOVEMODE_TOGGLED,
} from "../actionCreators/types";

// Add functionality to display message on add and delete.
// as well as Show delete button if it exists in favorites...

const INITIAL_STATE = {
  favoritesList: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
  removeMode: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDED_FAVORITE:
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.payload],
      };

    case REMOVED_FAVORITE:
      return {
        ...state,
        favoritesList: action.payload,
      };

    case REMOVEMODE_TOGGLED:
      return {
        ...state,
        removeMode: action.payload,
      };

    default:
      return state;
  }
};
