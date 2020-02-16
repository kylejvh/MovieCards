import { combineReducers } from "redux";
import favoritesReducer from "./favoritesReducer";
import singleMovieReducer from "./singleMovieReducer";
import multipleMovieReducer from "./multipleMovieReducer";

export default combineReducers({
  favorites: favoritesReducer,
  movie: singleMovieReducer,
  movies: multipleMovieReducer
});
