import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import "typeface-roboto";

import { API_KEY } from "../api/key";
import { fetchMovie } from "../actions";
import Navbar from "../components/newmoviepage/Navbar";
import Details from "../components/newmoviepage/Details";
import Images from "../components/newmoviepage/Images";
import Videos from "../components/newmoviepage/Videos";
import Credits from "../components/newmoviepage/Credits";

import Loader from "../components/Helper/Loader";

const MasterContainer = styled.div`
  background: ${props => props.conditionalBgGradient},
    no-repeat center center url(${props => props.posterPath});
  display: flex;
  background-size: cover;
  height: 100vh;
  /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
  font-size: 24px;
  background-attachment: fixed;
  color: white;

  @media screen and (min-width: 1025px) {
    font-size: 16px;
  }

  @media screen and (min-width: 1824px) {
    font-size: 22px;
  }

  @media screen and (min-width: 2400px) {
    font-size: 30px;
  }

  @media screen and (min-width: 3000px) {
    font-size: 45px;
  }
`;

const NewMoviePage = props => {
  const { movie, videos, images, credits, clickedMovieId, fetchMovie } = props;

  let { path, url } = useRouteMatch();

  const posterURL = "https://image.tmdb.org/t/p/original";

  let backdropImage = movie ? posterURL + movie.backdrop_path : "";
  if (props.location.pathname === `/${clickedMovieId}/credits`) {
    backdropImage = posterURL + movie.images.backdrops[4].file_path;
  } else if (props.location.pathname === `/${clickedMovieId}/images`) {
    backdropImage = posterURL + movie.images.backdrops[3].file_path;
  }

  // If movieId passed into data fetch endpoint does not exist in state, just use the id from the URL.
  let urlMovieId = clickedMovieId ? clickedMovieId : props.match.params.id;

  const pageGradients = {
    bottom: `linear-gradient(180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.9) 50%,
        rgba(0, 0, 0, .95) 100%
      )`,
    left: `linear-gradient(270deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.35) 50%,
        rgba(0, 0, 0, 0.9) 60%,
        rgba(0, 0, 0, .95) 100%
      )`
  };

  const fetchUrl = `https://api.themoviedb.org/3/movie/${urlMovieId}?api_key=${API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  let gradientChange;

  if (props.location.pathname === `/${clickedMovieId}`) {
    gradientChange = pageGradients.left;
  } else {
    gradientChange = pageGradients.bottom;
  }

  /* //            switch (props.pageGradient) {
//                  case "left":
//                      return (linear-gradient(270deg,
//     rgba(0, 0, 0, 0) 0%,
//     rgba(0, 0, 0, 0.35) 50%,
//     rgba(0, 0, 0, 0.92) 60%,
//     rgba(0, 0, 0, 1) 100%
//   ),
//   no-repeat center center url(${props => props.posterPath}));
//                  case "bottom":
//                      return "#2E7D32";
//                  default:
//                       return "left";
//          }
//         }};
   */

  useEffect(() => {
    fetchMovie(fetchUrl);
  }, []);

  const pathsArr = ["id", "cast", "crew", "images", "videos"];
  // Generate array of paths...
  // Loop over array, if path matches array value,

  //   let backdropNum;
  //   if (movie) {
  //     for (i = 0; i < pathsArr.length; i++) {
  //       if (pathsArr[i] === path) {
  //         backdropNum = pathsArr[i];
  //       }
  //     }
  //   }

  //   let backgroundPath;
  //   if (movie) {
  //     if (path === "/:id") {
  //       backgroundPath = posterURL + movie.backdrop_path;
  //     } else {
  //       backgroundPath =
  //         posterURL + movie.images.backdrops[Math.random()].file_path;
  //     }
  //   }

  //       case "/":
  //         return console.log(path, "switch path");
  //           return (backgroundPath = `${posterURL}${movie.images.backdrops[3].file_path}`);
  //         case "cast":
  //           return (backgroundPath = `${posterURL}${movie.images.backdrops[3].file_path}`);
  //         case "crew":
  //           return (backgroundPath = `${posterURL}${movie.images.backdrops[3].file_path}`);

  //       default:
  //         return (backgroundPath = posterURL + movie.backdrop_path);
  //     }
  //   }

  //! Make navbar fixed...
  //! Implement page transitions...
  //! When url path changes, change backgroundPath gradient and load another backdrop...
  //!

  //   background: linear-gradient(
  //     270deg,
  //     rgba(0, 0, 0, 0) 0%,
  //     rgba(0, 0, 0, 0.35) 50%,
  //     rgba(0, 0, 0, 0.92) 60%,
  //     rgba(0, 0, 0, 1) 100%
  //   ),
  //   no-repeat center center url(${props => props.posterPath});

  //   let backgroundShift;
  //   if (path) {
  //     backgroundShift =
  //     background: linear-gradient(
  //         180deg,
  //         rgba(0, 0, 0, 0) 0%,
  //         rgba(0, 0, 0, 0.92) 45%,
  //         rgba(0, 0, 0, 0) 60%,
  //         rgba(0, 0, 0, 0) 100%
  //       ),
  //       no-repeat center center url(${props => props.posterPath});
  //   }

  return (
    <>
      {movie && videos && credits && images ? (
        <MasterContainer
          conditionalBgGradient={gradientChange}
          posterPath={backdropImage}
        >
          {console.log(backdropImage)}
          {console.log(clickedMovieId, "clicked id")}
          {console.log(props.location.pathname, "current pathname")}
          <Navbar />
          <Switch>
            <Route exact path={`${path}`}>
              <Details movie={movie} videos={videos} />
            </Route>
            <Route path={`${path}/credits`}>
              <Credits credits={credits} />
            </Route>

            <Route path={`${path}/images`}>
              <Images images={images} />
            </Route>
          </Switch>
          {/* <Route path={`${path}/videos`}>
            <Videos videos={videos.results} />
          </Route> */}
        </MasterContainer>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    movie: state.movie.movie,
    images: state.movie.images,
    videos: state.movie.videos,
    credits: state.movie.credits,
    clickedMovieId: state.movie.clickedMovieId
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchMovie })(NewMoviePage)
);
