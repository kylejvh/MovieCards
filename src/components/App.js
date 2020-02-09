import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./history";
import React from "react";

//import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import Navigation from "../components/Navigation/Navigation";
import Search from "../pages/Search";
import PopularMovies from "../pages/PopularMovies";

import NewMoviePage from "../pages/NewMoviePage";

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
    <>
      <GlobalStyle />
      <Router>
        <Route
          exact
          path={["/", "/upcoming", "/search", "/favorites"]}
          component={Navigation}
        />
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route path="/upcoming" component={UpcomingMovies} />
          <Route path="/search" component={Search} />
          <Route path="/favorites" component={Favorites} />
          <Route
            path={["/:id", "/upcoming/:id", "/search/:id", "/favorites/:id"]}
            component={NewMoviePage}
          />
        </Switch>
        {/* <NotFound default /> */}
      </Router>
<<<<<<< Updated upstream
      {/* <Switch>
        <Route exact path="/" component={PopularMovies}></Route>
        <Route path="/upcoming" render={() => <UpcomingMovies />} />
        <Route path="/search" render={() => <Search />} />
        <Route path="/favorites" component={Favorites}></Route>
        <Route path="/moviepage" render={() => <FullMoviePage />} />
       <Route path="/byactor" render={() => <DiscoverByActor />} /> 
      </Switch> */}
    </Store>
=======
    </>
>>>>>>> Stashed changes
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
