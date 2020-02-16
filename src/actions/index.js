import {
  FETCH_MOVIE,
  FETCH_MOVIES_INITIATED,
  FETCH_MOVIES_FAILED,
  FETCH_MOVIES_SUCCEEDED,
  ADDED_FAVORITE,
  REMOVED_FAVORITE,
  MOVIE_CLICKED
} from "./types";

import { API_KEY } from "../api/key";
import history from "../components/history";
import axios from "axios";

export const handleMovieClick = (id, path) => async dispatch => {
  dispatch({ type: MOVIE_CLICKED, payload: id });

  // No path is needed for root ("/"), so if the param doesn't exist, just use id.
  let url = path !== "/" ? `${path}/${id}` : `/${id}`;
  console.log(url, "url to nav to...");
  history.push(url);
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

    dispatch({ type: FETCH_MOVIES_SUCCEEDED, payload: response.data.results });
  } catch (error) {
    dispatch({ type: FETCH_MOVIES_FAILED });
    console.error("%cData Fetching Error:", "font-size: 18px", error);
  }
};

export const addFavorite = movie => (dispatch, getState) => {
  const { favoritesList } = getState().favorites;
  console.log("add fav trigged.", favoritesList);
  console.log(movie, "addedfav movie");

  if (favoritesList.length === 0) {
    // If no favorites exist, clone the movie and copy into newArray.
    console.log("length is zero...");
    let newArray = [];
    let deepClone = JSON.parse(JSON.stringify(movie));
    newArray = [...newArray, deepClone];
    console.log(newArray, "added fav");
    return dispatch({ type: ADDED_FAVORITE, payload: newArray });
  } else if (favoritesList.length > 0) {
    let newArray = favoritesList.slice();

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
  const { favoritesList } = getState().favorites;

  const newFavorites = favoritesList.filter(item => item.id !== movie.id);

  dispatch({ type: REMOVED_FAVORITE, payload: newFavorites });
};
