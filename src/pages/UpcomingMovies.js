import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";
import Navigation from "../components/Navigation/Navigation";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const UpcomingMovies = props => {
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

  //Get date three months from now.
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 90);

  let searchDate = currentDate.toISOString().substring(0, 10);
  const todayDate = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      searchRequest();
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${todayDate}&release_date.lte=${searchDate}&with_release_type=3%7C2`

        // `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=840`
      );

      // get current date in format of 2019-month-day
      // find out how to use date addition to roll over to next year
      // add 3 months
      // search for movies less than that date.

      await Promise.all(
        response.data.results.map(async movie => {
          movie.details = await getDetails(movie.id);
        })
      );
      // !! add error handling...
      // Call function passed in as props to lift results up to state in App.js
      searchComplete(response.data.results);
    };
    fetchData();
  }, []);

  // Append details object to each movie
  const getDetails = async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    return response.data;
  };

  return (
    <div>
      <div className="header-container">
        <Navigation />
      </div>
      <h1>Not Yet Released....</h1>
      <MovieContainer>
        {movies.map(movie => {
          return (
            <MovieCard
              movie={movie}
              loading={isLoading}
              handleMovieClick={handleMovieClick}
            />
          );
        })}
      </MovieContainer>
    </div>
  );
};

export default UpcomingMovies;

// /discover/movie?sort_by=popularity.desc

// in this component you need to:
// call the above endpoint to gather data
// show popular movies using moviecards as laid out in other page

// map over movies once data is gathered, and display as on other page.

// how would you use the reducer set up to send it your resutsl?//
