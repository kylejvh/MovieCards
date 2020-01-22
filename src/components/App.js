import { hot } from "react-hot-loader/root";
import { Router } from "@reach/router";
import React from "react";

import { createGlobalStyle } from "styled-components";

import { normalize } from "styled-normalize";

import Store from "./Store/Store";
import Search from "../pages/Search";
import FullMoviePage from "../pages/FullMoviePage";
import PopularMovies from "../pages/PopularMovies";
import UpcomingMovies from "../pages/UpcomingMovies";
import Favorites from "../pages/Favorites";
// import DiscoverByActor from "../pages/DiscoverByActor";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    @import url("https://fonts.googleapis.com/css?family=Titillium+Web:400, 600i&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
    /* font-family: "Nunito", sans-serif; */
    background-color: #2c3949;
  font-family: "Titillium Web";  
  }
`;

const App = () => {
  return (
    <Store>
      <GlobalStyle />
      <Router>
        <PopularMovies path="/" />
        <UpcomingMovies path="/upcoming" />
        <Search path="/search" />
        <Favorites path="/favorites" />
        <FullMoviePage path="fullmoviepage" />
      </Router>
    </Store>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
