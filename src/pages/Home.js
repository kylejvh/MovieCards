import React from "react";
import styled from "styled-components";

import Navigation from "../components/Navigation/Navigation";
import Search from "../components/Search";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard/MovieCard";
import useAxiosHook from "../components/DataFetch/useAxiosHook";
import PageSwitch from "../components/PageSwitch";
import Favorites from "./Favorites";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 1vw 1.5vw;

  @media screen and (max-width: 361px) {
  }
`;

const Home = props => {
  const { handleMovieClick } = props;

  const [{ data, isLoading, isError }, doFetch] = useAxiosHook();

  // defaults = [1124, 335984, 1551398,  ["374720", ]

  return (
    <>
      <Navigation />
      <Search onSubmit={doFetch} />
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
      {/* <PageSwitch incrementPage={pageData} /> */}
    </>
  );
};

export default Home;
