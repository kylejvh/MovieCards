import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import FullMoviePage from "../pages/FullMoviePage";
import PopularMovies from "../pages/PopularMovies";
import UpcomingMovies from "../pages/UpcomingMovies";
import DiscoverByActor from "../pages/DiscoverByActor";

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

  const handleMovieClick = movie => {
    setClickedMovieState({
      movie
    });
    history.push("/moviepage");
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
          render={() => <FullMoviePage clickedMovieState={clickedMovieState} />}
        />
        <Route
          path="/byactor"
          render={() => <DiscoverByActor handleMovieClick={handleMovieClick} />}
        />
        <Route path="/favorites" component={Favorites} />
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
