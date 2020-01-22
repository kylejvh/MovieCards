import { hot } from "react-hot-loader/root";
import { Router } from "@reach/router";
import React from "react";

import Store from "./Store/Store";
import Search from "../pages/Search";
import FullMoviePage from "../pages/FullMoviePage";
import PopularMovies from "../pages/PopularMovies";
import UpcomingMovies from "../pages/UpcomingMovies";
import Favorites from "../pages/Favorites";
// import DiscoverByActor from "../pages/DiscoverByActor";

const App = () => {
  return (
    <Store>
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
