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

const PopularMovies = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  const [{ data, isLoading, isError }] = useAxiosHook(url);

  const { handleMovieClick } = props;

  return (
    <>
      <Navigation />
      <PageText>Currently trending movies.</PageText>
      {isError && <div>An error occured, please try again.</div>}
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

export default PopularMovies;
