import React from "react";
import styled from "styled-components";

import Navigation from "../components/Navigation/Navigation";
import Searchbar from "../components/Helper/Searchbar";
import Loader from "../components/Helper/Loader";
import MovieCard from "../components/MovieCard/MovieCard";
import useAxiosHook from "../components/DataFetch/useAxiosHook";
// import PageSwitch from "../components/PageSwitch";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 1vw 1.5vw;

  @media screen and (max-width: 3000px) {
    justify-content: center;
  }

  @media screen and (max-width: 2000px) {
    justify-content: center;
  }
`;

const Search = () => {
  const [{ data, isLoading }, doFetch] = useAxiosHook();

  // defaults = [1124, 335984, 1551398,  ["374720", ]

  return (
    <>
      <Navigation />
      <Searchbar onSubmit={doFetch} />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieContainer>
          {data.map(movie => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </MovieContainer>
      )}
      {/* <PageSwitch incrementPage={pageData} /> */}
    </>
  );
};

export default Search;
