import React, { useEffect } from "react";
import styled from "styled-components";

import { API_KEY } from "../api/key";
import { connect } from "react-redux";
import { fetchMovies } from "../actions";
import Loader from "../components/Helper/Loader";
import MovieCard from "../components/MovieCard/MovieCard";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
  @media screen and (max-width: 3000px) {
    justify-content: center;
  }

  @media screen and (max-width: 2000px) {
    justify-content: center;
  }
`;

const PageText = styled.h1`
  font-size: 1.5em;
  margin: 1.5em 1em 0 1em;
  color: #7ca579;
`;

const ErrorText = styled(PageText)`
  color: #ec0312;
`;

const UpcomingMovies = ({ fetchMovies, movies, isError, isLoading }) => {
  // Get date three months from now. Convert date to TMDB API's required syntax.
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 90);
  let searchDate = currentDate.toISOString().substring(0, 10);
  const todayDate = new Date().toISOString().substring(0, 10);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${todayDate}&release_date.lte=${searchDate}&with_release_type=3%7C2`;

  // const [{ data, isLoading, isError }] = useMovieData(url);

  useEffect(() => {
    fetchMovies(url);
  }, []);

  return (
    <>
      <PageText>Movies releasing in the next 3 months.</PageText>
      {isError && <ErrorText>An error occured, please try again.</ErrorText>}
      {isLoading ? (
        <Loader />
      ) : (
        <MovieContainer>
          {movies.map(movie => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </MovieContainer>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    isError: state.movies.isError,
    isLoading: state.movies.isLoading
  };
};

export default connect(mapStateToProps, { fetchMovies })(UpcomingMovies);
