import { hot } from "react-hot-loader/root";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
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

  *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 100%;
  
  @media screen and (max-width: 1601px) {
    font-size: 80%;
  }

  @media screen and (max-width: 1023px) {
    font-size: 62.5%;
  }
}

  body {
    font-family: "Titillium Web", sans-serif;  
     /* font-family: "Nunito", sans-serif; */
    background-color: #2c3949;
    box-sizing: border-box;
    color: white;
  }
`;

const TitleContainer = styled.div`
  position: relative;
`;

const Title = styled.h1`
  position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
`;

const App = () => {
  return (
    <>
      {/* 
      <TitleContainer>
        <div class="text-box">
          <h1 class="heading-primary">
           Use css advanced anims 
            <span class="heading-primary-main">MovieCards</span>
            <span class="heading-primary-sub">powered by TMdb</span>
          </h1>
        </div>
        <Title>MovieCards</Title>
      </TitleContainer>
       */}
      <GlobalStyle />
      <Router history={history}>
        <Navigation />
        {/* <Route
          exact
          patTitle={["/", "/upcoming", "/search", "/favorites"]}
          component={Navigation}
        /> */}
        <Switch>
          <Redirect exact from="/" to="/popular" />
          <Route exact path="/popular" component={PopularMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/favorites" component={Favorites} />
          <Route
            path={[
              "/popular/:id",
              "/upcoming/:id",
              "/search/:id",
              "/favorites/:id"
            ]}
            component={NewMoviePage}
          />
        </Switch>
        {/* <NotFound default /> */}
      </Router>
    </>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
