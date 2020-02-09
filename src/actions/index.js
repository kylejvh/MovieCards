import {
  FETCH_MOVIE,
  FETCH_MOVIES_INITIATED,
  FETCH_MOVIES_FAILED,
  FETCH_MOVIES_SUCCEEDED,
  ADDED_FAVORITE,
  REMOVED_FAVORITE,
  REDIRECT_INITIATED,
  REDIRECT_SUCCEEDED,
  REDIRECT_FAILED
} from "./types";

import { API_KEY } from "../api/key";
import history from "../components/history";
import axios from "axios";

export const handleMovieClick = (id, path) => async dispatch => {
  dispatch({ type: REDIRECT_INITIATED, payload: id });
};

export const fetchMovie = url => async dispatch => {
  const response = await axios.get(url);
  dispatch({ type: FETCH_MOVIE, payload: response.data });
};

export const fetchMovies = url => async dispatch => {
  dispatch({ type: FETCH_MOVIES_INITIATED });

  try {
    const response = await axios.get(url);

    await Promise.all(
      response.data.results.map(async movie => {
        const responseDetails = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&&language=en-US`
        );
        movie.details = responseDetails.data;
      })
    );

    console.log(response.data.results, "handling fetch of all movies...");
    dispatch({ type: FETCH_MOVIES_SUCCEEDED, payload: response.data.results });
  } catch (error) {
    dispatch({ type: FETCH_MOVIES_FAILED });
    console.error("%cData Fetching Error:", "font-size: 18px", error);
  }
};

export const addFavorite = movie => (dispatch, getState) => {
  const { favorites } = getState().favorites;
  console.log("add fav trigged.", favorites);
  console.log(movie, "addedfav movie");

  if (favorites.length === 0) {
    // If no favorites exist, clone the movie and copy into newArray.
    console.log("length is zero...");
    let newArray = [];
    let deepClone = JSON.parse(JSON.stringify(movie));
    newArray = [...newArray, deepClone];
    console.log(newArray, "added fav");
    return dispatch({ type: ADDED_FAVORITE, payload: newArray });
  } else if (favorites.length > 0) {
    let newArray = favorites.slice();

    if (newArray.find(item => item.id === movie.id)) {
      return console.log("match found via find");
    }

    // If no duplicates exist, add to favorites list.

    let deepClone = JSON.parse(JSON.stringify(movie));
    newArray = [...newArray, deepClone];
    return dispatch({ type: ADDED_FAVORITE, payload: newArray });
  }
};

export const removeFavorite = movie => (dispatch, getState) => {
  const { favorites } = getState().favorites;

  const newFavorites = favorites.filter(item => item.id !== movie.id);

  dispatch({ type: REMOVED_FAVORITE, payload: newFavorites });
};
