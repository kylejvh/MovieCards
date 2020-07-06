import {
  FETCH_TRAILERS_INITIATED,
  FETCH_TRAILERS_FAILED,
  FETCH_TRAILERS_SUCCEEDED,
  VIDEO_CLICKED,
} from "../actionCreators/types";

const INITIAL_STATE = {
  trailers: null,
  clickedVideo: null,
  isError: false,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRAILERS_INITIATED:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case FETCH_TRAILERS_FAILED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    case FETCH_TRAILERS_SUCCEEDED:
      return {
        ...state,
        trailers: action.payload,
        isError: false,
        isLoading: false,
      };

    case VIDEO_CLICKED:
      return {
        ...state,
        clickedVideo: action.payload,
      };

    default:
      return state;
  }
};
