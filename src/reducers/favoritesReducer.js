import { ADDED_FAVORITE, REMOVED_FAVORITE } from "../actions/types";

// Add functionality to display message on add and delete.
// as well as Show delete button if it exists in favorites...

const INITIAL_STATE = {
  favoritesList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDED_FAVORITE:
      return { ...state, favoritesList: action.payload };

    case REMOVED_FAVORITE:
      return {
        ...state,
        favoritesList: action.payload
      };
    default:
      return state;
  }
};
