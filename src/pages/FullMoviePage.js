import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { fetchMovie } from "../actionCreators/fetchMovie";

import "typeface-roboto";
import Chip from "@material-ui/core/Chip";
import { ChevronLeft } from "styled-icons/material/ChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import moment from "moment";

import { Link, useParams } from "react-router-dom";

import Trailer from "../components/Helper/Trailer";
import Loader from "../components/Helper/Loader";
import AddFavoriteButton from "../components/Helper/AddFavoriteButton";
import { CTX } from "../components/Store/Store";

import useMovieData from "../components/DataFetch/useMovieData";

// import ExpandButton from "../components/ExpandButton";

//! Mobile Styled Components

const MobileContainer = styled.div`
  /* background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 55%), */
  //! Test background
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.05) 35%,
      rgba(44, 57, 73, 0.8) 55%,
      rgba(44, 57, 73, 1) 70%
    ),
    /* linear-gradient(360deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)), */
      no-repeat center center url(${(props) => props.posterPath});

  @media screen and (min-width: 700px) {
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 50%,
        rgba(44, 57, 73, 0.8) 60%,
        rgba(44, 57, 73, 1) 70%,
        rgba(44, 57, 73, 0.99) 100%
      ),
      no-repeat center center url(${(props) => props.posterPath});
    background-size: cover;
  }

  background-size: cover;
  height: 100vh;
  width: 100%;
  /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
  font-size: 24px;
  color: white;
  display: flex;
  justify-content: flex-end;
  flex-flow: column;
`;

const MobileDetails = styled.div`
  padding: 0 2rem 0 2rem;
  flex-flow: row wrap;
  /* linear-gradient(360deg, rgba(44, 57, 73, 1), rgba(0, 0, 0, 0)); */
`;

const MobileTitle = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 2rem;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0 0 0.5rem 0;
  width: 100%;
`;

const MobileTaglineText = styled.h3`
  font: italic 600 1rem "Titillium Web", sans-serif;
  margin: 0 0 1rem 0;
  width: 100%;
`;

const SubTextContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
  font-size: 1.25rem;
`;

const Pill = styled(Chip)`
  margin: 0 0.25rem 0 0;
`;

const ChipContainer = styled.div`
  justify-content: space-around;
`;

const RatingContainer = styled.div`
  text-shadow: #2c3949;
  margin: 0;
  padding: 0;
  border-radius: 10%;
  color: gold;
  align-self: center;
`;

const RatingIcon = styled(FontAwesomeIcon).attrs({ icon: faStar })`
  margin: 0 0.25rem;
`;

const RuntimeContainer = styled(RatingContainer)`
  color: white;
`;

const RuntimeIcon = styled(FontAwesomeIcon).attrs({ icon: faStopwatch })`
  margin: 0 0.25rem;
`;

const SideContainer = styled.div`
  display: flex;
`;

const MobilePlot = styled.p`
  margin: 1.25rem 0;
  font-size: 1rem;
  width: 60%;
  flex: 1;
`;

const TabletContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin: 1.25rem 0;
  font-size: 1rem;
  align-items: flex-end;
  width: 40%;
`;

const TabletText = styled.p`
  margin: 0 0 0.75rem 0;
`;

const ButtonContainer = styled.div`
  margin: 1.25rem 0;
  display: flex;
  justify-content: space-around;
`;

const BackButton = styled(Link)`
  margin: 0.5rem;
  padding: 0;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  font-size: 1.5rem;
  justify-self: center;
  align-self: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  text-decoration: none;
  background: #2769b4;

  :hover {
    cursor: pointer;
  }

  :active {
    transform: scale(1.1);
    background: #008080;
  }
`;

const BackIcon = styled(ChevronLeft)`
  color: white;
  width: 1.1em;
  height: 1.1em;
  margin: 0em 0.35em;
`;

//! Desktop Styled Components

const MasterContainer = styled.div`
  background: linear-gradient(360deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)),
    no-repeat center center url(${(props) => props.posterPath});
  background-size: cover;
  height: 100vh;
  /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
  font-size: 24px;
  color: white;
  display: flex;
  background-color: #2c3949;

  @media screen and (min-width: 1824px) {
    font-size: 23px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(360deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)); */
  align-items: center;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  margin: 2.4rem 2.5rem 0 2.5rem;
`;

const LeftButtons = styled(ButtonContainer)`
  margin: 1rem 0 0 0;
  flex-flow: column;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 40rem;
  height: 65%;
  background: rgba(0, 0, 0, 0.93);

  /* linear-gradient(
     0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  ); */
  box-shadow: 0 0 5px 15px rgba(0, 0, 0, 0.93);

  margin: 3rem 3rem 0 0;
`;

// const CastContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

const BottomContainer = styled.div`
  display: flex;
  height: 100%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 3rem;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
`;

const DetailTitle = styled(MovieTitle)`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const Poster = styled.img`
  width: 15em;
  box-shadow: 10px 10px 38px 19px rgba(255, 255, 255, 0.1);
  filter: blur(0.0001em);
`;

const Text = styled.p`
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;

const MoviePlot = styled(Text)`
  margin: 2em 0 0 0;
  font-size: 0.75em;
  width: 70%;
`;

const TaglineText = styled.h3`
  font: italic 600 1em "Titillium Web", sans-serif;
  margin-top: 0.25em;
  width: 14em;
`;

const FullMoviePage = ({ movie, videos, images, credits, fetchMovie }) => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/530915?api_key=${API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  useEffect(() => {
    fetchMovie(url);
  }, []);

  const posterURL = "https://image.tmdb.org/t/p/original";
  const mobilePosterURL = "https://image.tmdb.org/t/p/w780";

  // let genresArray = movie.genres ? movie.genres.map(item => item.name) : [];

  const convertRuntime = (num) => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  // const convertedRuntime = movie.runtime ? convertRuntime(movie.runtime) : "";

  // const convertedReleaseDate = moment(movie.release_date, "YYYY-MM-DD");

  // Mobile Aware Queries - Used for short-circuit rendering of elements.
  const isMobileorTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeTablet = useMediaQuery({ query: "(min-width: 680px)" });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1025px)",
  });

  let isError = false;
  //! Temporary Conditional to stop undefined errors...
  let conditionalContent;
  if (isError) {
    conditionalContent = <div>Error Occurred</div>;
  } else if (movie !== null) {
    conditionalContent = (
      <>
        <MasterContainer posterPath={posterURL + movie.backdrop_path}>
          <DesktopBackButton to="../">
            <BackIcon />
            Back
          </DesktopBackButton>
          <LeftContainer>
            <Poster src={mobilePosterURL + movie.poster_path}></Poster>
            {movie.tagline && <TaglineText>"{movie.tagline}"</TaglineText>}
            <LeftButtons>
              <Trailer urlKey={videos.results && videos.results[0].key} />
              <AddFavoriteButton movie={movie} favorites={state.favorites} />
            </LeftButtons>
          </LeftContainer>
          <CenterContainer>
            <Header>
              <h1>{movie.title}</h1>
              <h2>{movie.genres.join(", ")}</h2>
              <div style={{ display: "flex" }}>
                {movie.runtime !== 0 && (
                  <>
                    <h2>
                      <RuntimeIcon />
                      {movie.runtime}
                    </h2>
                  </>
                )}
                {movie.vote_average !== 0 && (
                  <>
                    <h2 style={{ color: "gold", marginLeft: ".5em" }}>
                      <RatingIcon />
                      {movie.vote_average}
                    </h2>
                  </>
                )}
              </div>
            </Header>
            <MoviePlot>
              <h1>Overview</h1>
              <p>{movie.overview}</p>
            </MoviePlot>

            {/* <CastContainer>
          <Cast style={{ flexDirection: "row" }} cast={creditsData.cast} /> 
          <ExpandButton
            buttonTitle="Cast"
            onClick={() =>
              setCreditsData(prevState => ({
                ...prevState,
                castToggle: !prevState.castToggle
              }))
            }
          /> 
          {creditsData.castToggle && castData} 
        </CastContainer> */}
            <BottomContainer>
              {/* <DetailContainer>
                 <DetailTitle>Director:</DetailTitle>
                {creditsData.crew.director && (
              <Text>{creditsData.crew.director.name}</Text>
            )} 
              </DetailContainer> */}
              {/* <DetailContainer>
                <DetailTitle>Composer:</DetailTitle>
               {creditsData.crew.composer && (
              <Text>{creditsData.crew.composer.name}</Text>
            )} 
              </DetailContainer> */}
              {/* <DetailContainer>
                <DetailTitle>Screenplay:</DetailTitle>
                {creditsData.crew.writers && (
              <Text>
                {creditsData.crew.writers.map(person => person.name).join(", ")}
              </Text>
            )} 
              </DetailContainer> */}

              <DetailContainer>
                <DetailTitle>Revenue:</DetailTitle>
                {movie.revenue === 0 ? (
                  <Text>Not Available</Text>
                ) : (
                  <Text> {"$ " + movie.revenue.toLocaleString()}</Text>
                )}
              </DetailContainer>
              <DetailContainer>
                <DetailTitle>Budget:</DetailTitle>
                {movie.budget === 0 ? (
                  <Text>Not Available</Text>
                ) : (
                  <Text> {"$ " + movie.budget.toLocaleString()}</Text>
                )}
              </DetailContainer>
              <DetailContainer>
                <DetailTitle>Release Date:</DetailTitle>
                {/* <Text>{movie.release_date.format("LL")}</Text> */}
              </DetailContainer>
            </BottomContainer>
          </CenterContainer>
          {/* <ScreenshotContainer>
            {movie.images.backdrops.slice(4, 8).map((image, i) => (
              <ScreenshotGradient
                key={i}
                screenshotPath={screenShotURL + image.file_path}
              ></ScreenshotGradient>
            ))}
          </ScreenshotContainer> */}
        </MasterContainer>
      </>
    );
  } else {
    conditionalContent = <Loader />;
    console.log(movie, "movie, from reducer");
    console.log(images, "from reducer");
    console.log(videos, "from reducer");
    console.log(credits, "from reducer");
  }
  return <>{conditionalContent}</>;
};

export default FullMoviePage;
