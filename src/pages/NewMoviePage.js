import React, { useEffect } from "react";
import { TMDB_API_KEY } from "../apis/tmdb/key";
import { fetchMovie } from "../actions";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { connect } from "react-redux";
import "typeface-roboto";

import LeftLayout from "../components/moviepage//layouts/LeftLayout";
import BottomLayout from "../components/moviepage/layouts/BottomLayout";
import Navbar from "../components/moviepage/Navbar";
import Details from "../components/moviepage/Details";
import Images from "../components/moviepage/images/Images";
import Videos from "../components/moviepage/videos/Videos";
import Credits from "../components/moviepage/credits/Credits";

import Loader from "../components/Helper/Loader";

import AltPoster from "../components/movielist/posterplaceholder.jpg";

//! Find a way to map

//! Old Container
// const MasterContainer = styled.div`
//   background: ${props => props.conditionalBgGradient},
//     no-repeat center center url(${props => props.posterPath});
//   display: flex;
//   background-size: cover;
//   height: 100vh;
//   /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
//   font-size: 24px;
//   background-attachment: fixed;
//   color: white;

//   @media screen and (min-width: 1025px) {
//     font-size: 16px;
//   }

//   @media screen and (min-width: 1824px) {
//     font-size: 22px;
//   }

//   @media screen and (min-width: 2400px) {
//     font-size: 30px;
//   }

//   @media screen and (min-width: 3000px) {
//     font-size: 45px;
//   }
// `;

const Content = styled.div`
  height: 100vh;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  height: 100%;
`;

const Left = styled.div`
  background: black;
  width: 30%;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    background-image: linear-gradient(to right, #000, transparent);
    top: 0;
    bottom: 0;
    left: 100%;
    width: 275px;
  }
`;

const Right = styled.div`
  background: no-repeat center url(${props => props.posterPath});
  background-size: cover;

  width: 70%;
`;

const ContentContainer = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
`;

//! 25%/75% Other page

const Content2 = styled.div`
  height: 100vh;
  position: relative;
`;

const Background2 = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Bot = styled.div`
  background: black;
  height: 30%;
  width: 100vw;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    background-image: linear-gradient(to top, #000, transparent);
    bottom: 100%;

    height: 275px;
    width: 100vw;
  }
`;

const Top = styled.div`
  background: no-repeat center url(${props => props.posterPath});
  background-size: cover;

  height: 70%;
  width: 100vw;
`;

const ContentContainer2 = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
`;

const MasterWrap = styled.div`
  @media screen and (max-width: 799px) {
  }
`;

const NewMoviePage = props => {
  const {
    movie = "",
    videos,
    images,
    credits,
    clickedMovieId,
    fetchMovie,
    isLoading,
    isError
  } = props;

  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  // If movieId passed into data fetch endpoint does not exist in state, just use the id from the URL.

  let urlMovieId = clickedMovieId ? clickedMovieId : props.match.params.id;

  const fetchUrl = `https://api.themoviedb.org/3/movie/${urlMovieId}?api_key=${TMDB_API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  useEffect(() => {
    fetchMovie(fetchUrl);
  }, [fetchMovie, fetchUrl]);

  let { path, url } = useRouteMatch();

  const posterURL = "https://image.tmdb.org/t/p/original";

  const ROOT_PATH = `${url}/details`;
  const CREDITS_PATH = `${url}/credits`;
  const IMAGES_PATH = `${url}/images`;
  const VIDEOS_PATH = `${url}/videos`;

  let backdropImage;

  if (images && images.backdrops.length >= 4) {
    switch (props.location.pathname) {
      case ROOT_PATH:
        backdropImage = `${posterURL}${images.backdrops[0].file_path}`;
        break;

      case CREDITS_PATH:
        backdropImage = `${posterURL}${images.backdrops[1].file_path}`;
        break;

      case IMAGES_PATH:
        backdropImage = `${posterURL}${images.backdrops[2].file_path}`;
        break;

      case VIDEOS_PATH:
        backdropImage = `${posterURL}${images.backdrops[3].file_path}`;
        break;

      default:
        backdropImage = `${posterURL}${images.backdrops[0].file_path}`;
        break;
    }
  } else if (images && images.backdrops.length > 0) {
    backdropImage = `${posterURL}${images.backdrops[0].file_path}`;
  } else if (images && images.posters.length > 0) {
    backdropImage = `${posterURL}${images.posters[0].file_path}`;
  } else {
    backdropImage = AltPoster;
  }

  // useEffect(() => {
  //   if (movie) {
  //     switch (props.location.pathname) {
  //       case ROOT_PATH:
  //         return setBackdropImage(
  //           `${posterURL}${movie.images.backdrops[0].file_path}`
  //         );

  //       case CREDITS_PATH:
  //         return setBackdropImage(
  //           `${posterURL}${movie.images.backdrops[1].file_path}`
  //         );
  //       case IMAGES_PATH:
  //         return setBackdropImage(
  //           `${posterURL}${movie.images.backdrops[2].file_path}`
  //         );
  //       case VIDEOS_PATH:
  //         return setBackdropImage(
  //           `${posterURL}${movie.images.backdrops[3].file_path}`
  //         );
  //       default:
  //     }
  //   }
  //   return () => {
  //     setBackdropImage(null);
  //   };
  // }, [props.location]);

  //! Make navbar fixed...
  //! Implement page transitions...
  //! When url path changes, change backgroundPath gradient and load another backdrop...

  return (
    <>
      {!isLoading && movie ? (
        <MasterWrap>
          <Navbar />
          <Switch>
            <Route path={`${path}/details`}>
              {isMobileOrTablet ? (
                <BottomLayout backdropImage={backdropImage}>
                  <Details />
                </BottomLayout>
              ) : (
                <LeftLayout backdropImage={backdropImage}>
                  <Details />
                </LeftLayout>
              )}
            </Route>
            <BottomLayout backdropImage={backdropImage}>
              <Route path={`${path}/credits`}>
                <Credits />
              </Route>
              <Route path={`${path}/images`}>
                <Images />
              </Route>
              <Route path={`${path}/videos`}>
                <Videos />
              </Route>
            </BottomLayout>
          </Switch>
        </MasterWrap>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

{
  /* {movie && videos && credits && images ? (
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
              <Images title={movie.title} images={images} />
            </Route>
          </Switch>
          <Route path={`${path}/videos`}>
            <Videos videos={videos.results} />
          </Route>
        </MasterContainer> */
}

const mapStateToProps = state => {
  return {
    movie: state.movie.movie,
    images: state.movie.images,
    clickedMovieId: state.movie.clickedMovieId,
    isLoading: state.movie.isLoading,
    isError: state.movie.isError
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchMovie })(NewMoviePage)
);
