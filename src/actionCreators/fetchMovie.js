import tmdb from "../apis/tmdb/tmdb";
import {
  FETCH_MOVIE_INITIATED,
  FETCH_MOVIE_FAILED,
  FETCH_MOVIE_SUCCEEDED,
} from "./types";

//! Make One fetchMovie function with optional args or handling for multiple requests...
export const fetchMovie = (url) => async (dispatch) => {
  dispatch({ type: FETCH_MOVIE_INITIATED });

  try {
    const response = await tmdb.get(url);

    dispatch({ type: FETCH_MOVIE_SUCCEEDED, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_MOVIE_FAILED });
    console.error("%cData Fetching Error:", "font-size: 18px", error);
  }
};
