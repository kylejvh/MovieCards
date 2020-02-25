import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Searchbar from "../components/Helper/Searchbar";
import Loader from "../components/Helper/Loader";
import MovieList from "../components/movielist/MovieList";

const SearchContainer = styled.div`
  display: flex;

  justify-content: center;
  margin: 6.5em 0 1.5em 0;

  @media screen and (max-width: 1600px) {
    margin: 4.5em 0 2em 0;
  }

  @media screen and (max-width: 800px) {
    margin: 4.5em 0 2em 0;
  }

  @media screen and (max-width: 380px) {
    margin: 3.5em 0 2em 0;
  }
`;

// import PageSwitch from "../components/PageSwitch";

const Search = ({ isError, isLoading }) => {
  // const [{ data, isLoading }, doFetch] = useMovieData();

  // defaults = [1124, 335984, 1551398,  ["374720", ]

  return (
    <>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      {isLoading ? <Loader /> : <MovieList />}
      {/* <PageSwitch incrementPage={pageData} /> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isError: state.movies.isError,
    isLoading: state.movies.isLoading
  };
};

export default connect(mapStateToProps)(Search);
