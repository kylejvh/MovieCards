import {
  FETCH_MOVIE_INITIATED,
  FETCH_MOVIE_FAILED,
  FETCH_MOVIE_SUCCEEDED,
  FETCH_MOVIES_INITIATED,
  FETCH_MOVIES_FAILED,
  FETCH_MOVIES_SUCCEEDED,
  FETCH_TRAILERS_INITIATED,
  FETCH_TRAILERS_FAILED,
  FETCH_TRAILERS_SUCCEEDED,
  SEARCH_QUERY_SUBMITTED,
  ADDED_FAVORITE,
  REMOVED_FAVORITE,
  VIDEO_CLICKED,
  MOVIE_CLICKED,
} from "./types";

import { TMDB_API_KEY } from "../apis/tmdb/key";
import { YOUTUBE_API_KEY } from "../apis/youtube/key";

import tmdb from "../apis/tmdb/tmdb";
import youtube from "../apis/youtube/youtube";

import history from "../components/history";

export const handleMovieClick = (id, path) => async (dispatch) => {
  dispatch({ type: MOVIE_CLICKED, payload: id });

  let navigationPath = `${path}/${id}/details`;

  history.push(navigationPath);
};

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

export const fetchMovies = (url, query = "") => async (dispatch) => {
  if (query) {
    dispatch({ type: SEARCH_QUERY_SUBMITTED, payload: query });
  }

  dispatch({ type: FETCH_MOVIES_INITIATED });

  try {
    const response = await tmdb.get(url);

    await Promise.all(
      response.data.results.map(async (movie) => {
        const responseDetails = await tmdb.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&&language=en-US`
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

export const fetchTrailers = (trailerIds) => async (dispatch) => {
  dispatch({ type: FETCH_TRAILERS_INITIATED });

  try {
    const response = await youtube.get("/videos", {
      params: {
        id: trailerIds,
        part: "snippet,contentDetails,statistics",
        key: YOUTUBE_API_KEY,
      },
    });

    dispatch({ type: FETCH_TRAILERS_SUCCEEDED, payload: response.data.items });
  } catch (error) {
    dispatch({ type: FETCH_TRAILERS_FAILED });
    console.error("%cData Fetching Error:", "font-size: 18px", error);
  }
};

export const onVideoSelect = (video) => {
  return { type: VIDEO_CLICKED, payload: video };
};

export const addFavorite = (movie) => (dispatch, getState) => {
  const { favoritesList } = getState().favorites;

  if (favoritesList.length === 0) {
    // initial fav added, and saved to localstorage.
    localStorage.setItem("favorites", JSON.stringify([movie]));
    return dispatch({ type: ADDED_FAVORITE, payload: movie });
  } else if (favoritesList.length > 0) {
    // If multiple favorites exist, handle duplicates. If none, append state and localstorage.
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));

    if (storedFavorites.find((i) => i.id === movie.id)) {
      //TODO: Add notifications for error handling.
      return console.log("match found via find");
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...storedFavorites, movie])
      );

      return dispatch({ type: ADDED_FAVORITE, payload: movie });
    }
  }
};

export const removeFavorite = (movie) => (dispatch, getState) => {
  const { favoritesList } = getState().favorites;
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));

  const newFavorites = favoritesList.filter((i) => i.id !== movie.id);

  const filteredStoredFavorites = storedFavorites.filter(
    (i) => i.id !== movie.id
  );

  localStorage.setItem("favorites", JSON.stringify(filteredStoredFavorites));

  dispatch({ type: REMOVED_FAVORITE, payload: newFavorites });
};
