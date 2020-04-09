import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchMovies } from "../actions";
import { TMDB_API_KEY } from "../apis/tmdb/key";
import Loader from "../components/Helper/Loader";
import MovieList from "../components/movielist/MovieList";

const Wrapper = styled.div`
  margin-top: 4em;

  @media screen and (max-width: 500px) {
    margin-top: 3em;
  }
`;

const PageText = styled.h1`
<<<<<<< HEAD
  font-size: 1.5em;
  margin: 1.5em 1em 0.75em 1em;
  color: #7ca579;

  @media screen and (min-width: 1824px) {
    margin-left: 5em;
=======
  font-size: 1em;
  margin: 0 6em;
  color: #7ca579;

  @media screen and (max-width: 500px) {
    margin: 1em;
>>>>>>> develop
  }
`;

const PopularMovies = ({ isError, isLoading, fetchMovies }) => {
  const url = `/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

<<<<<<< HEAD
  const [{ data, isLoading, isError }] = useAxiosHook(url);
  const moviecards = data.map(movie => (
    <MovieCard key={movie.id.toString()} movie={movie}></MovieCard>
  ));
=======
  useEffect(() => {
    fetchMovies(url);
  }, [fetchMovies, url]);
>>>>>>> develop

  return (
    <Wrapper>
      <PageText>Currently trending movies.</PageText>
      {isError && <div>An error occured, please try again.</div>}
      {isLoading ? (
        <Loader />
      ) : (
<<<<<<< HEAD
        <MovieContainer>
          {/* {data.map(movie => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))} */}
          {moviecards}
        </MovieContainer>
=======
        <>
          <MovieList />
        </>
>>>>>>> develop
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    isError: state.movies.isError,
    isLoading: state.movies.isLoading,
  };
};

export default connect(mapStateToProps, { fetchMovies })(PopularMovies);
