import { hot } from "react-hot-loader/root";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import React from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import Navigation from "../components/Navigation/Navigation";
import PopularMovies from "../pages/PopularMovies";
import UpcomingMovies from "../pages/UpcomingMovies";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import NewMoviePage from "../pages/NewMoviePage";
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
    <>
      <GlobalStyle />
      <Router history={history}>
        <Navigation />
        {/* <Route
          exact
          path={["/", "/upcoming", "/search", "/favorites"]}
          component={Navigation}
        /> */}
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route path="/search" component={Search} />
          <Route path="/favorites" component={Favorites} />
          <Route
            path={["/:id", "/upcoming/:id", "/search/:id", "/favorites/:id"]}
            component={NewMoviePage}
          />
        </Switch>
        {/* <NotFound default /> */}
      </Router>
    </>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
