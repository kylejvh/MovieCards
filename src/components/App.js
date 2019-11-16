import { hot } from "react-hot-loader/root";
import React, { useReducer, useState, useEffect } from "react";
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

const initialState = {
  isLoading: true,
  movies: [],
  pageData: {
    currentPage: 1,
    totalPages: null
  }
};

const movieSearchReducer = (state, action) => {
  switch (action.type) {
    case MOVIE_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case MOVIE_SEARCH_COMPLETE:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
        pageData: action.payload
      };
    case INCREMENT_PAGE:
      return { pageData: state.pageData.currentPage + 1 };
    case DECREMENT_PAGE:
      return { pageData: state.pageData.currentPage - 1 };
    default:
      return state;
  }
};

// write a reducer for clickedMovie actions???

//React Hooks - Reducer Action Types
const MOVIE_SEARCH_REQUEST = "MOVIE_SEARCH_REQUEST";
const MOVIE_SEARCH_COMPLETE = "MOVIE_SEARCH_COMPLETE";
const INCREMENT_PAGE = "INCREMENT_PAGE";
const DECREMENT_PAGE = "DECREMENT_PAGE";

const App = () => {
  const [state, dispatch] = useReducer(movieSearchReducer, initialState);

  const [clickedMovieState, setClickedMovieState] = useState({
    movie: [],
    isClicked: false
  });

  const history = useHistory();

  // use useffect deps or find a way to run this only if the id changes?

  // Dispatch request helper function - to be passed down as props
  const searchRequestDispatch = () => {
    return dispatch({
      type: MOVIE_SEARCH_REQUEST
    });
  };

  // Dispatch complete helper function - to be passed down as props, lifts payload up to be stored in state.
  const searchCompleteDispatch = payload => {
    return dispatch({
      type: MOVIE_SEARCH_COMPLETE,
      payload
    });
  };

  const incrementPageDispatch = payload => {
    return dispatch({
      type: INCREMENT_PAGE
    });
  };

  // extract to functional component...
  const handleMovieClick = (id) /* needed? */ => {
    const clickedMovie = movies.find(movie => movie.id === id);
    setClickedMovieState({
      movie: clickedMovie,
      isClicked: true // needed?
    });
    history.push("/moviepage");
  };

  const { movies, isLoading, pageData } = state;

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              movies={movies}
              pageData={pageData}
              isLoading={isLoading}
              searchRequest={searchRequestDispatch}
              searchComplete={searchCompleteDispatch}
              handleMovieClick={handleMovieClick}
            />
          )}
        />
        <Route
          path="/moviepage"
          render={() => (
            <FullMoviePage
              clickedMovieState={clickedMovieState}
              isLoading={isLoading}
            />
          )}
        />
        <Route
          path="/byactor"
          render={() => (
            <DiscoverByActor // needs other state
              movies={movies}
              clickedMovieState={clickedMovieState}
              isLoading={isLoading}
              searchRequest={searchRequestDispatch}
              searchComplete={searchCompleteDispatch}
              handleMovieClick={handleMovieClick}
            />
          )}
        />
        <Route path="/favorites" component={Favorites} />
        <Route
          path="/popular"
          render={() => (
            <PopularMovies // needs other state
              movies={movies}
              clickedMovieState={clickedMovieState}
              isLoading={isLoading}
              searchRequest={searchRequestDispatch}
              searchComplete={searchCompleteDispatch}
              handleMovieClick={handleMovieClick}
            />
          )}
        />
        <Route
          path="/upcoming"
          render={() => (
            <UpcomingMovies // needs other state
              movies={movies}
              clickedMovieState={clickedMovieState}
              isLoading={isLoading}
              searchRequest={searchRequestDispatch}
              searchComplete={searchCompleteDispatch}
              handleMovieClick={handleMovieClick}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
