import { ADDED_FAVORITE, REMOVED_FAVORITE } from "../actions/types";

// Add functionality to display message on add and delete.
// as well as Show delete button if it exists in favorites...

const INITIAL_STATE = {
  favorites: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDED_FAVORITE:
      return { ...state, favorites: action.payload };

    case REMOVED_FAVORITE:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};
