import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { fetchMovie } from "../actions";

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
      no-repeat center center url(${props => props.posterPath});

  @media screen and (min-width: 700px) {
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 50%,
        rgba(44, 57, 73, 0.8) 60%,
        rgba(44, 57, 73, 1) 70%,
        rgba(44, 57, 73, 0.99) 100%
      ),
      no-repeat center center url(${props => props.posterPath});
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
  padding: 0.1em;
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
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.97) 10%,
      rgba(0, 0, 0, 0.92) 20%,
      rgba(0, 0, 0, 0.92) 80%,
      rgba(0, 0, 0, 0.97) 100%
    ),
    no-repeat center center url(${props => props.posterPath});
  background-size: cover;
  height: 100vh;
  /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
  font-size: 24px;
  color: white;
  display: flex;
  background-color: #2c3949;
  align-items: center;

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

const DesktopBackButton = styled(BackButton)`
  padding: 0.2em 0.5em 0.2em 0;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(360deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)); */
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  /* background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  ); */
  /* margin: 3em 2.5em 0 2.5em; */
  padding: 0 2.5em 0 2.5em;
`;

const Poster = styled.img`
  width: 18em;
  max-width: 100%;
  height: auto;
  /* box-shadow: 10px 10px 38px 19px rgba(255, 255, 255, 0.1);
  filter: blur(0.0001em); */
  margin: 3em 0 1em 0;
`;

const LeftButtons = styled(ButtonContainer)`
  margin: 1em 0 0 0;
  flex-flow: column;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  /* background: rgba(0, 0, 0, 0.93); */

  /* linear-gradient(
     0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  ); */
  /* box-shadow: 0 0 5px 15px rgba(0, 0, 0, 0.93); */

  margin: 1em 3em;
`;

// const CastContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

const BottomContainer = styled.div`
  display: flex;
<<<<<<< HEAD
  height: 100%;
`;

const ScreenshotContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  flex: 1;
=======
>>>>>>> develop
  height: 100%;

  /* background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  ); */
`;

const ScreenshotGradient = styled.div`
  height: auto;
  max-height: 25%;
  flex: 1;
  width: 100%;
  background: no-repeat center/contain url(${props => props.screenshotPath});
  margin: 1em;
  /* box-shadow: 0 0.1em 0.1em rgba(0, 0, 0, 0.034),
    0 0.12em 0.22em rgba(0, 0, 0, 0.048), 0 0.5em 0.4em rgba(0, 0, 0, 0.06),
    0 1em 0.75em rgba(0, 0, 0, 0.072), 0 0.5em 0.35em rgba(0, 0, 0, 0.086),
    0 2.5em 2em rgba(0, 0, 0, 0.12); */

  border-radius: 5px;
  /* box-shadow: 10px 38px 19px rgba(255, 255, 255, 0.1); */
  /* filter: blur(0.0001em); */
  /* transition: all 300ms ease;
  &:hover {
    transform: scale(1.05);
  } */
  /* Write up animations with props to have each image ease in, one after the other. */
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em 2.5em 0 0;
`;

const Header = styled.div`
  margin-bottom: 1em;

  h1 {
    font-family: "Titillium Web", sans-serif;
    font-size: 3.5em;
    text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
      4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
    margin: 0 0 0.25em 0;
    padding: 0;
  }

  h2 {
    font-size: 1.25em;
    margin: 0.1em 0;
  }
`;

const MovieTitle = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 3.5em;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0.15em 0;
  padding: 0;
`;

const DetailTitle = styled(MovieTitle)`
  font-size: 1em;
  font-weight: 600;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1em;
  margin: 0 0 0.1em 0;
`;

const MoviePlot = styled.div`
  width: 80%;
  margin: 3em 0 0 0;

  h1 {
    font-size: 1.25em;
    margin: 0.1em 0;
  }

  p {
    font-size: 1em;
  }
`;

const TaglineText = styled.h3`
  font: italic 600 1.25em "Titillium Web", sans-serif;
  margin-top: 0.25em;
  max-width: 90%;
`;

<<<<<<< HEAD
const FullMoviePage = () => {
  const { state } = useContext(CTX);
  const { clickedMovie: movie } = state;

  const posterURL = "https://image.tmdb.org/t/p/original";
  const mobilePosterURL = "https://image.tmdb.org/t/p/w780";
  const screenShotURL = "https://image.tmdb.org/t/p/w1280";
=======
const FullMoviePage = ({ movie, videos, images, credits, fetchMovie }) => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/530915?api_key=${API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  useEffect(() => {
    fetchMovie(url);
  }, []);

  const posterURL = "https://image.tmdb.org/t/p/original";
  const mobilePosterURL = "https://image.tmdb.org/t/p/w780";

  // let genresArray = movie.genres ? movie.genres.map(item => item.name) : [];
>>>>>>> develop

  const convertRuntime = num => {
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
    query: "(min-width: 1025px)"
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
<<<<<<< HEAD
          <DesktopBackButton onClick={() => navigate("../")}>
=======
          <DesktopBackButton to="../">
>>>>>>> develop
            <BackIcon />
            Back
          </DesktopBackButton>
          <LeftContainer>
            <Poster src={mobilePosterURL + movie.poster_path}></Poster>
<<<<<<< HEAD
            {movie.details.tagline && (
              <TaglineText>"{movie.details.tagline}"</TaglineText>
            )}
=======
            {movie.tagline && <TaglineText>"{movie.tagline}"</TaglineText>}
>>>>>>> develop
            <LeftButtons>
              <Trailer urlKey={videos.results && videos.results[0].key} />
              <AddFavoriteButton movie={movie} favorites={state.favorites} />
            </LeftButtons>
          </LeftContainer>
          <CenterContainer>
            <Header>
              <h1>{movie.title}</h1>
<<<<<<< HEAD
              <h2>{genresArray.join(", ")}</h2>
=======
              <h2>{movie.genres.join(", ")}</h2>
>>>>>>> develop
              <div style={{ display: "flex" }}>
                {movie.runtime !== 0 && (
                  <>
                    <h2>
                      <RuntimeIcon />
<<<<<<< HEAD
                      {convertedRuntime}
                    </h2>
                  </>
                )}
                {movie.details.vote_average !== 0 && (
                  <>
                    <h2 style={{ color: "gold", marginLeft: ".5em" }}>
                      <RatingIcon />
                      {movie.details.vote_average}
=======
                      {movie.runtime}
                    </h2>
                  </>
                )}
                {movie.vote_average !== 0 && (
                  <>
                    <h2 style={{ color: "gold", marginLeft: ".5em" }}>
                      <RatingIcon />
                      {movie.vote_average}
>>>>>>> develop
                    </h2>
                  </>
                )}
              </div>
            </Header>
            <MoviePlot>
              <h1>Overview</h1>
              <p>{movie.overview}</p>
            </MoviePlot>
<<<<<<< HEAD
=======

>>>>>>> develop
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
<<<<<<< HEAD
          <ScreenshotContainer>
            {movie.details.images.backdrops.slice(4, 8).map((image, i) => (
=======
          {/* <ScreenshotContainer>
            {movie.images.backdrops.slice(4, 8).map((image, i) => (
>>>>>>> develop
              <ScreenshotGradient
                key={i}
                screenshotPath={screenShotURL + image.file_path}
              ></ScreenshotGradient>
            ))}
<<<<<<< HEAD
          </ScreenshotContainer>
        </MasterContainer>
      )}

      {isMobileorTablet && (
        <>
          <MobileContainer posterPath={mobilePosterURL + movie.poster_path}>
            <BackButton onClick={() => navigate("../")}>
              <BackIcon />
            </BackButton>
            <MobileDetails>
              <MobileTitle>{movie.title}</MobileTitle>
              {movie.details.tagline && (
                <MobileTaglineText>"{movie.details.tagline}"</MobileTaglineText>
              )}
              <ChipContainer>
                {genresArray.map((item, index) => (
                  <Pill
                    color="primary"
                    size="small"
                    key={index}
                    label={item}
                  ></Pill>
                ))}
              </ChipContainer>
              <SubTextContainer>
                {convertedReleaseDate.format("YYYY")} &middot;
                {movie.details.runtime !== 0 && (
                  <>
                    <RuntimeContainer>
                      <RuntimeIcon />
                      {convertedRuntime} &middot;
                    </RuntimeContainer>
                  </>
                )}
                {movie.details.vote_average !== 0 && (
                  <RatingContainer>
                    <RatingIcon />
                    {movie.details.vote_average}
                  </RatingContainer>
                )}
              </SubTextContainer>
              <SideContainer>
                <MobilePlot>{movie.overview}</MobilePlot>
                {isLargeTablet && (
                  <TabletContainer>
                    {movie.details.budget === 0 ? (
                      <TabletText>Budget: Not Available</TabletText>
                    ) : (
                      <TabletText>
                        Budget: $
                        {parseFloat(movie.details.budget).toLocaleString("en")}
                      </TabletText>
                    )}

                    {movie.details.revenue === 0 ? (
                      <TabletText>Revenue: Not Available</TabletText>
                    ) : (
                      <TabletText>
                        Revenue: $
                        {parseFloat(movie.details.revenue).toLocaleString("en")}
                      </TabletText>
                    )}
                  </TabletContainer>
                )}
              </SideContainer>
            </MobileDetails>
            <ButtonContainer>
              <Trailer
                urlKey={
                  movie.details.videos.results &&
                  movie.details.videos.results[0].key
                }
              />
              <AddFavoriteButton movie={movie} favorites={state.favorites} />
            </ButtonContainer>
          </MobileContainer>
        </>
      )}
    </>
  );
=======
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
>>>>>>> develop
};

export default FullMoviePage;
