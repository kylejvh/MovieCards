import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Searchbar from "../components/Helper/Searchbar";
import Loader from "../components/Helper/Loader";
import MovieCard from "../components/MovieCard/MovieCard";
// import useMovieData from "../components/DataFetch/useMovieData";
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

const Search = ({ movies, isError, isLoading }) => {
  // const [{ data, isLoading }, doFetch] = useMovieData();

  // defaults = [1124, 335984, 1551398,  ["374720", ]

  return (
    <>
      <Searchbar />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieContainer>
          {movies.map(movie => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </MovieContainer>
      )}
      {/* <PageSwitch incrementPage={pageData} /> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    isError: state.movies.isError,
    isLoading: state.movies.isLoading
  };
};

export default connect(mapStateToProps)(Search);
