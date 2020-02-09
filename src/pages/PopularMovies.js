import React, { useEffect } from "react";
import styled from "styled-components";
import { Route, useRouteMatch, Switch, Link, Redirect } from "react-router-dom";

import useMovieData from "../components/DataFetch/useMovieData";
import Loader from "../components/Helper/Loader";
import MovieCard from "../components/MovieCard/MovieCard";
import FullMoviePage from "../pages/FullMoviePage";
import NewMoviePage from "../pages/NewMoviePage";

import { connect } from "react-redux";
import { fetchMovies } from "../actions";
import { API_KEY } from "../api/key";

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

const PopularMovies = ({
  movies,
  isError,
  isLoading,
  fetchMovies,
  match,
  redirect
}) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

<<<<<<< Updated upstream
  const [{ data, isLoading, isError }] = useAxiosHook(url);
  const differentType = data.map(movie => (
    <MovieCard key={movie.id.toString()} movie={movie}></MovieCard>
=======
  // const [{ data, isLoading, isError }] = useMovieData(url);

  const { path } = useRouteMatch();

  useEffect(() => {
    fetchMovies(url);
  }, []);

  const renderMovieCards = movies.map(movie => (
    <MovieCard
      key={movie.id.toString()}
      movie={movie}
      path={match.path}
    ></MovieCard>
>>>>>>> Stashed changes
  ));

  //? Pass props into moviecard for url?

  let redirectOnClick;
  redirect.renderRedirect
    ? (redirectOnClick = <Redirect to={`/${redirect.clickedMovieId}`} push />)
    : (redirectOnClick = null);

  return (
    <>
      {redirectOnClick}
      {console.log(match, "new path")}
      <PageText>Currently trending movies.</PageText>
      {isError && <div>An error occured, please try again.</div>}
      {isLoading ? (
        <Loader />
      ) : (
<<<<<<< Updated upstream
        <MovieContainer>
          {/* {data.map(movie => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))} */}
          {differentType}
        </MovieContainer>
=======
        <>
          <MovieContainer>{renderMovieCards}</MovieContainer>
        </>
>>>>>>> Stashed changes
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies.movies,
    isError: state.movies.isError,
    isLoading: state.movies.isLoading,
    redirect: state.redirect
  };
};

export default connect(mapStateToProps, { fetchMovies })(PopularMovies);
