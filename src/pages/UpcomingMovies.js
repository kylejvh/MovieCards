import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { TMDB_API_KEY } from "../apis/tmdb/key";

import { fetchMovies } from "../actions";
import Loader from "../components/Helper/Loader";
import MovieList from "../components/movielist/MovieList";

const Wrapper = styled.div`
  margin-top: 4em;

  @media screen and (max-width: 500px) {
    margin-top: 3em;
  }
`;

const PageText = styled.h1`
  font-size: 1em;
  margin: 0 6em;
  color: #7ca579;

  @media screen and (min-width: 1824px) {
    margin-left: 5em;
  }
`;

const ErrorText = styled(PageText)`
  color: #ec0312;
`;

const UpcomingMovies = ({ fetchMovies, isError, isLoading }) => {
  // Get date three months from now. Convert date to TMDB API's required syntax.
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 90);
  let searchDate = currentDate.toISOString().substring(0, 10);
  const todayDate = new Date().toISOString().substring(0, 10);

  const url = `/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${todayDate}&release_date.lte=${searchDate}&with_release_type=3%7C2`;

  useEffect(() => {
    fetchMovies(url);
  }, [fetchMovies, url]);

  return (
    <Wrapper>
      <PageText>Movies releasing in the next 3 months.</PageText>
      {isError && <ErrorText>An error occured, please try again.</ErrorText>}
      {isLoading ? <Loader /> : <MovieList />}
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    isError: state.movies.isError,
    isLoading: state.movies.isLoading
  };
};

export default connect(mapStateToProps, { fetchMovies })(UpcomingMovies);
