import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
import Cast from "../Experimental/Cast";
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


const FullMoviePage = () => {
  const { state } = useContext(CTX);
  const { clickedMovie } = state;
  let { urlId } = useParams();

  //! If movie.id is not accessible from state, take movie.id from URL params.
  const clickedIdorURLId = !clickedMovie.id ? urlId : clickedMovie.id;

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/530915?api_key=${API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  const [
    { data: movie, credits, images, videos, isLoading, isError }
  ] = useMovieData(url, true);

  const posterURL = "https://image.tmdb.org/t/p/original";
  const mobilePosterURL = "https://image.tmdb.org/t/p/w780";
  const screenShotURL = "https://image.tmdb.org/t/p/w1280";

  let genresArray = movie.genres ? movie.genres.map(item => item.name) : [];

  const convertRuntime = num => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  const convertedRuntime = movie.runtime ? convertRuntime(movie.runtime) : "";

  const convertedReleaseDate = moment(movie.release_date, "YYYY-MM-DD");

  // Mobile Aware Queries - Used for short-circuit rendering of elements.
  const isMobileorTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeTablet = useMediaQuery({ query: "(min-width: 680px)" });




        {isMobileorTablet && (
          <>
            <MobileContainer posterPath={mobilePosterURL + movie.poster_path}>
              <BackButton to="../">
                <BackIcon />
              </BackButton>
              <MobileDetails>
                <MobileTitle>{movie.title}</MobileTitle>
                {movie.tagline && (
                  <MobileTaglineText>"{movie.tagline}"</MobileTaglineText>
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
                  {movie.runtime !== 0 && (
                    <>
                      <RuntimeContainer>
                        <RuntimeIcon />
                        {convertedRuntime} &middot;
                      </RuntimeContainer>
                    </>
                  )}
                  {movie.vote_average !== 0 && (
                    <RatingContainer>
                      <RatingIcon />
                      {movie.vote_average}
                    </RatingContainer>
                  )}
                </SubTextContainer>
                <SideContainer>
                  <MobilePlot>{movie.overview}</MobilePlot>
                  {isLargeTablet && (
                    <TabletContainer>
                      {movie.budget === 0 ? (
                        <TabletText>Budget: Not Available</TabletText>
                      ) : (
                        <TabletText>
                          Budget: $
                          {parseFloat(movie.budget).toLocaleString("en")}
                        </TabletText>
                      )}

                      {movie.revenue === 0 ? (
                        <TabletText>Revenue: Not Available</TabletText>
                      ) : (
                        <TabletText>
                          Revenue: $
                          {parseFloat(movie.revenue).toLocaleString("en")}
                        </TabletText>
                      )}
                    </TabletContainer>
                  )}
                </SideContainer>
              </MobileDetails>
              <ButtonContainer>
                <Trailer urlKey={videos.results && videos.results[0].key} />
                <AddFavoriteButton movie={movie} favorites={state.favorites} />
              </ButtonContainer>
            </MobileContainer>
          </>
        )}
      </>
    );
  } else {
    conditionalContent = <Loader />;
    console.log(movie);
  }

  return <>{conditionalContent}</>;
};

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div>
//       HI zoomer
// {console.log(movie, "isolated fetch")}
// {console.log(isLoading, "loadstate")}
//     </div>
//   );
// };

export default FullMoviePage;
