import React from "react";
import axios from "axios";
import styled from "styled-components";

import MovieCard from "../components/MovieCard/MovieCard";
import Navigation from "../components/Navigation/Navigation";
import Search from "../components/Search";
import PageSwitch from "../components/PageSwitch";

import Favorites from "./Favorites";

import "../style.css";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 1vw 1.5vw;

  @media screen and (max-width: 361px) {
  }
`;

const Home = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // TheMovieDB API Key

  const {
    movies,
    pageData,
    isLoading,
    searchRequest,
    searchComplete,
    handleMovieClick
  } = props;

  // defaults = [1124, 335984, 1551398,  ["374720", ]

  const search = async query => {
    searchRequest();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageData.currentPage}&include_adult=false&840`
    );

    await Promise.all(
      response.data.results.map(async movie => {
        movie.details = await getDetails(movie.id);
      })
    );
    console.log(response);
    // !! add error handling...
    // Call function passed in as props to lift results up to state in App.js
    response.data.results.total_pages = response.data.total_pages;

    return searchComplete(response.data.results);
  };

  // Append details object to each movie
  const getDetails = async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    return response.data;
  };

  return (
    <div>
      <Navigation />
      <Search onSubmit={search} />
      {/* {isLoading && <span>loading...</span>} */}
      <MovieContainer>
        {movies.map(movie => {
          return (
            <MovieCard
              movie={movie}
              loading={isLoading}
              handleMovieClick={handleMovieClick}
            />
          );
        })}
      </MovieContainer>
      {/* <div className="master-container">
        
      </div> */}
      <PageSwitch incrementPage={pageData} />
    </div>
  );
};

export default Home;
