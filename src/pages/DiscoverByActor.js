import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";
import Navigation from "../components/Navigation/Navigation";
import Search from "../components/Search";

const DiscoverByActor = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const history = useHistory();
  const {
    movies,
    isLoading,
    clickedMovieState,
    searchRequest,
    searchComplete,
    handleMovieClick
  } = props;

  const search = async query => {
    searchRequest();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );

    // !! add error handling...
    // Call function passed in as props to lift results up to state in App.js
    return searchComplete(response.data.results);
  };

  // Append details object to each movie
  const getDetails = async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    return response.data;
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     searchRequest();
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  //     );

  //     await Promise.all(
  //       response.data.results.map(async movie => {
  //         movie.details = await getDetails(movie.id);
  //       })
  //     );
  //     !! add error handling...
  //     Call function passed in as props to lift results up to state in App.js
  //     searchComplete(response.data.results);
  //   };
  //   fetchData();
  // }, []);

  // // Append details object to each movie
  // const getDetails = async id => {
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  //   );

  //   return response.data;
  // };

  return (
    <div>
      <div className="header-container">
        <Navigation />
      </div>
      <Search onSubmit={search} />
      <h1>
        Type in a movie you've watched, and select an actor from that movie. A
        list of movies will be selected.
      </h1>
      {movies.map(movie => {
        return (
          <MovieCard
            movie={movie}
            loading={isLoading}
            handleMovieClick={handleMovieClick}
          />
        );
      })}
    </div>
  );
};

export default DiscoverByActor;

// /discover/movie?sort_by=popularity.desc

// in this component you need to:
// call the above endpoint to gather data
// show popular movies using moviecards as laid out in other page

// map over movies once data is gathered, and display as on other page.

// how would you use the reducer set up to send it your resutsl?//
