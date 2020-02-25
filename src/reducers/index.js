import { combineReducers } from "redux";
import favoritesReducer from "./favoritesReducer";
import singleMovieReducer from "./singleMovieReducer";
import multipleMoviesReducer from "./multipleMoviesReducer";
import movieTrailersReducer from "./movieTrailersReducer";

export default combineReducers({
  favorites: favoritesReducer,
  movie: singleMovieReducer,
  movies: multipleMoviesReducer,
  trailers: movieTrailersReducer
});
