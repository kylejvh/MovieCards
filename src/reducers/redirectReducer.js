import {
  REDIRECT_INITIATED,
  REDIRECT_FAILED,
  REDIRECT_SUCCEEDED
} from "../actions/types";

const INITIAL_STATE = {
  clickedMovieId: "",
  renderRedirect: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REDIRECT_INITIATED:
      return {
        ...state,
        clickedMovieId: action.payload,
        renderRedirect: true
      };

    case REDIRECT_SUCCEEDED:
      return {
        ...state,
        clickedMovieId: "",
        renderRedirect: false
      };

    default:
      return state;
  }
};
