import { MOVIE_CLICKED } from "./types";

import history from "../components/history";

export const handleMovieClick = (id, path) => async (dispatch) => {
  dispatch({ type: MOVIE_CLICKED, payload: id });

  let navigationPath = `${path}/${id}/details`;

  history.push(navigationPath);
};
