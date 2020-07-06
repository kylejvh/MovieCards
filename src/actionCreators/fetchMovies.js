import tmdb from "../apis/tmdb/tmdb";
import { TMDB_API_KEY } from "../apis/tmdb/key";
import {
  FETCH_MOVIES_INITIATED,
  FETCH_MOVIES_SUCCEEDED,
  FETCH_MOVIES_FAILED,
  SEARCH_QUERY_SUBMITTED,
} from "./types";

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
