import { hot } from "react-hot-loader/root";
import { Router } from "@reach/router";
import React from "react";

//import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { normalize } from "styled-normalize";

import Store from "./Store/Store";
import Search from "../pages/Search";
import FullMoviePage from "../pages/FullMoviePage";
import PopularMovies from "../pages/PopularMovies";
import UpcomingMovies from "../pages/UpcomingMovies";
import Favorites from "../pages/Favorites";
// import DiscoverByActor from "../pages/DiscoverByActor";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    @import url("https://fonts.googleapis.com/css?family=Titillium+Web:400, 600i&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
    /* font-family: "Nunito", sans-serif; */
    background-color: #2c3949;
  font-family: "Titillium Web";  
  }

  body {
    /* padding: 0;
    background-color: black; */
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
      {/* <Switch>
        <Route exact path="/" component={PopularMovies}></Route>
        <Route path="/upcoming" render={() => <UpcomingMovies />} />
        <Route path="/search" render={() => <Search />} />
        <Route path="/favorites" component={Favorites}></Route>
        <Route path="/moviepage" render={() => <FullMoviePage />} />
       <Route path="/byactor" render={() => <DiscoverByActor />} /> 
      </Switch> */}
    </Store>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
