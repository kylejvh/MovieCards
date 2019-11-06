import { hot } from "react-hot-loader/root";
import React, { useReducer, useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import FullMoviePage from "../pages/FullMoviePage";
import PopularMovies from "../pages/PopularMovies";

import "../style.css";

const initialState = {
  isLoading: true,
  movies: []
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
        movies: action.payload
      };
    default:
      return state;
  }
};

// write a reducer for clickedMovie actions???

//React Hooks - Reducer Action Types
const MOVIE_SEARCH_REQUEST = "MOVIE_SEARCH_REQUEST";
const MOVIE_SEARCH_COMPLETE = "MOVIE_SEARCH_COMPLETE";

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

  // extract to functional component...
  const handleMovieClick = (id) /* needed? */ => {
    const clickedMovie = movies.find(movie => movie.id === id);
    setClickedMovieState({
      movie: clickedMovie,
      isClicked: true // needed?
    });
    history.push("/moviepage");
  };

  const { movies, isLoading } = state;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Home
            movies={movies}
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
      {/* <Route path="/byactor" component={DiscoverByActor} /> */}

      <Route path="/favorites" component={Favorites} />
      <Route
        path="/popular"
        render={() => (
          <PopularMovies // needs other state
            clickedMovieState={clickedMovieState}
            isLoading={isLoading}
          />
        )}
      />
    </Switch>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
