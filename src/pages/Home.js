import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import MovieCard from "../components/MovieCard";
import HeaderButton from "../components/HeaderButton";
import Search from "../components/Search";

import Favorites from "./Favorites";

import "../style.css";

const Home = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // TheMovieDB API Key
  const history = useHistory();
  const {
    movies,
    isLoading,
    searchRequest,
    searchComplete,
    handleMovieClick
  } = props;

  // defaults = [1124, 335984, 1551398,  ["374720", ]

  const search = async query => {
    searchRequest();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );

    await Promise.all(
      response.data.results.map(async movie => {
        movie.details = await getDetails(movie.id);
      })
    );
    // !! add error handling...
    // Call function passed in as props to lift results up to state in App.js
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
    <div className="">
      <div className="header-container">
        <HeaderButton buttonTitle="My Favorites" />
        <HeaderButton buttonTitle="Upcoming Movies" />
        <HeaderButton
          buttonTitle="Popular Movies"
          onClick={() => history.push("/popular")}
        />
      </div>
      <Search onSubmit={search} />
      {isLoading && <span>loading...</span>}
      <Favorites movieIDList={null} />
      <div className="master-container">
        {console.log(movies)}
        {movies.map(movie => {
          return (
            <MovieCard
              movie={movie}
              loading={isLoading}
              handleMovieClick={handleMovieClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
