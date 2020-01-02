import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Home from "../pages/Home";
import FullMoviePage from "../pages/FullMoviePage";
import PopularMovies from "../pages/PopularMovies";
import UpcomingMovies from "../pages/UpcomingMovies";
import DiscoverByActor from "../pages/DiscoverByActor";
import Favorites from "../pages/Favorites";

import "../style.css";

const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Titillium+Web:600i&display=swap");
    font-family: "Titillium Web";
`;

// const initialState = {
//   pageData: {
//     currentPage: 1,
//     totalPages: null
//   }
// };

const App = () => {
  const history = useHistory();
  const [clickedMovieState, setClickedMovieState] = useState({
    movie: []
  });

  const [favoritesData, setFavoritesData] = useState({
    list: [],
    checkedForDeletion: {
      deleteList: [],
      isChecked: false
    }
  });

  const handleMovieClick = movie => {
    setClickedMovieState({
      movie
    });
    history.push("/moviepage");
  };

  const onAddFavorite = data => {
    setFavoritesData(prevState => {
      return { list: [...prevState.list, data] };
    });
  };

  const addToDeleteList = id => {
    console.log("you checked it");
    setFavoritesData(prevState => {
      return {
        checkedForDeletion: {
          deleteList: [...prevState.checkedForDeletion.deleteList, id],
          isChecked: !prevState.checkedForDeletion.isChecked
        }
      };
    });
  };

  const removeFromFavorites = () => {
    // compare id's on checkedfordeletion to list, and if a match, remove all matched!
    return;
  };

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home handleMovieClick={handleMovieClick} />}
        />
        <Route
          path="/moviepage"
          render={() => (
            <FullMoviePage
              clickedMovieState={clickedMovieState}
              onAddFavorite={onAddFavorite}
            />
          )}
        />
        <Route
          path="/byactor"
          render={() => <DiscoverByActor handleMovieClick={handleMovieClick} />}
        />
        <Route
          path="/favorites"
          render={() => (
            <Favorites
              handleMovieClick={handleMovieClick}
              favoritesData={favoritesData}
              addToDeleteList={addToDeleteList}
              isChecked={favoritesData.checkedForDeletion.isChecked}
            />
          )}
        />
        <Route
          path="/popular"
          render={() => <PopularMovies handleMovieClick={handleMovieClick} />}
        />
        <Route
          path="/upcoming"
          render={() => <UpcomingMovies handleMovieClick={handleMovieClick} />}
        />
      </Switch>
    </>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
