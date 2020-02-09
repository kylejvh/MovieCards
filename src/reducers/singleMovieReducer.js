import { FETCH_MOVIE } from "../actions/types";

const INITIAL_STATE = {
  movie: null,
  credits: null,
  videos: null,
  images: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        credits: { ...action.payload.credits },
        videos: { ...action.payload.videos },
        images: { ...action.payload.images }
      };

    default:
      return state;
  }
};
