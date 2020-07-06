import { combineReducers } from "redux";
import favorites from "./favorites";
import singleMovie from "./singleMovie";
import multipleMovies from "./multipleMovies";
import trailers from "./trailers";

export default combineReducers({
  favorites,
  movie: singleMovie,
  movies: multipleMovies,
  trailers,
});
