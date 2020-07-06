import { ADDED_FAVORITE } from "./types";

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
