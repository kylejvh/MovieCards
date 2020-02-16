import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchMovies } from "../actions";
import { API_KEY } from "../api/key";
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

const PopularMovies = ({ movies, isError, isLoading, fetchMovies }) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  // const [{ data, isLoading, isError }] = useMovieData(url);

  useEffect(() => {
    fetchMovies(url);
  }, []);

  const renderMovieCards = movies.map(movie => (
    <MovieCard key={movie.id.toString()} movie={movie}></MovieCard>
  ));

  return (
    <>
      <PageText>Currently trending movies.</PageText>
      {isError && <div>An error occured, please try again.</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieContainer>{renderMovieCards}</MovieContainer>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    isError: state.movies.isError,
    isLoading: state.movies.isLoading,
    redirect: state.redirect
  };
};

export default connect(mapStateToProps, { fetchMovies })(PopularMovies);
