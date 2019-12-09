import React from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard/MovieCard";
import Navigation from "../components/Navigation/Navigation";
import useAxiosHook from "../components/DataFetch/useAxiosHook";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const UpcomingMovies = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Get date three months from now. Convert date to TMDB API's required syntax.
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 90);
  let searchDate = currentDate.toISOString().substring(0, 10);
  const todayDate = new Date().toISOString().substring(0, 10);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${todayDate}&release_date.lte=${searchDate}&with_release_type=3%7C2`;

  const { handleMovieClick } = props;
  const [{ data, isLoading, isError }] = useAxiosHook(url);

  return (
    <div>
      <div className="header-container">
        <Navigation />
      </div>
      <h1>Not Yet Released....</h1>
      {isError && <div>An error occured, please try again.</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MovieContainer>
          {data.map(movie => {
            return (
              <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
            );
          })}
        </MovieContainer>
      )}
    </div>
  );
};

export default UpcomingMovies;
