import React from "react";
import styled from "styled-components";

import useAxiosHook from "../components/DataFetch/useAxiosHook";
import Navigation from "../components/Navigation/Navigation";
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
  margin: 1.5em 1em 0.75em 1em;
  color: #7ca579;

  @media screen and (min-width: 1824px) {
    margin-left: 5em;
  }
`;

const PopularMovies = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  const [{ data, isLoading, isError }] = useAxiosHook(url);
  const moviecards = data.map(movie => (
    <MovieCard key={movie.id.toString()} movie={movie}></MovieCard>
  ));

  return (
    <>
      <Navigation />
      <PageText>Currently trending movies.</PageText>
      {isError && <div>An error occured, please try again.</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <MovieContainer>
          {/* {data.map(movie => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))} */}
          {moviecards}
        </MovieContainer>
      )}
    </>
  );
};

export default PopularMovies;
