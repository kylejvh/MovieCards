import React from "react";
import useAxiosHook from "../components/DataFetch/useAxiosHook";
import styled from "styled-components";

import MovieCard from "../components/MovieCard/MovieCard";
import Navigation from "../components/Navigation/Navigation";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const PopularMovies = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  const [{ data, isLoading, isError }] = useAxiosHook(url);

  const { handleMovieClick } = props;

  return (
    <div>
      <Navigation />
      <h1>movies</h1>
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

export default PopularMovies;
