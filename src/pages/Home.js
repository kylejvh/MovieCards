import React from "react";
import styled from "styled-components";

import MovieCard from "../components/MovieCard/MovieCard";
import Navigation from "../components/Navigation/Navigation";
import useAxiosHook from "../components/DataFetch/useAxiosHook";
import Search from "../components/Search";
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
    <div>
      <Navigation />
      <Search onSubmit={doFetch} />
      <MovieContainer>
        {data.map(movie => {
          return (
            <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
          );
        })}
      </MovieContainer>
      {/* <PageSwitch incrementPage={pageData} /> */}
    </div>
  );
};

export default Home;
