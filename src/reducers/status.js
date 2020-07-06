//! put errors, loading, messagehandling, etc. here
import {
  FETCH_MOVIE_INITIATED,
  FETCH_MOVIE_FAILED,
  FETCH_MOVIE_SUCCEEDED,
  MOVIE_CLICKED,
} from "../actionCreators/types";

const INITIAL_STATE = {
  isError: false,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIE_INITIATED:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case FETCH_MOVIE_FAILED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    case FETCH_MOVIE_SUCCEEDED:
      return {
        ...state,
        movie: action.payload,
        credits: { ...action.payload.credits },
        videos: { ...action.payload.videos },
        images: { ...action.payload.images },
        isError: false,
        isLoading: false,
      };

    case MOVIE_CLICKED:
      return {
        ...state,
        clickedMovieId: action.payload,
      };

    default:
      return state;
  }
};
