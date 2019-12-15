import React from "react";
import styled from "styled-components";

import useAxiosHook from "../components/DataFetch/useAxiosHook";
import Navigation from "../components/Navigation/Navigation";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard/MovieCard";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const PageText = styled.h1`
  font-size: 1.5em;
  margin: 1.5em 1em 0 1em;
  color: #7ca579;
`;

const ErrorText = styled(PageText)`
  color: #ec0312;
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
    <>
      <Navigation />
      <PageText>Movies releasing in the next 3 months.</PageText>
      {isError && <ErrorText>An error occured, please try again.</ErrorText>}
      {isLoading ? (
        <Loader />
      ) : (
        <MovieContainer>
          {data.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleMovieClick={handleMovieClick}
              />
            );
          })}
        </MovieContainer>
      )}
    </>
  );
};

export default UpcomingMovies;
