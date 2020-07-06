import { REMOVED_FAVORITE } from "./types";

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
