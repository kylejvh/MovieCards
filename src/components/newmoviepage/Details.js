import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { addFavorite } from "../../actions";

import Chip from "@material-ui/core/Chip";
import { ChevronLeft } from "styled-icons/material/ChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import moment from "moment";

import { Link, useParams } from "react-router-dom";

import Trailer from "../Helper/Trailer";
import AddFavoriteButton from "../Helper/AddFavoriteButton";

// import ExpandButton from "../components/ExpandButton";

const MasterContainer = styled.div`
  background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.35) 50%,
      rgba(0, 0, 0, 0.92) 60%,
      rgba(0, 0, 0, 1) 100%
    ),
    no-repeat center center url(${props => props.posterPath});
  background-size: cover;
  height: 100vh;
  /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
  font-size: 24px;
  color: white;
  display: flex;
  background-color: #2c3949;

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

const ButtonContainer = styled.div`
  margin: 1.25rem 0;
  display: flex;
  justify-content: space-around;
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

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35%;
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
  margin: 3em 0 0 0;

  h1 {
    font-size: 1.25em;
    margin: 0.1em 0;
  }

  p {
    font-size: 1em;
  }
`;

const RuntimeIcon = styled(FontAwesomeIcon).attrs({ icon: faStopwatch })`
  margin: 0 0.25rem;
`;

const BackIcon = styled(ChevronLeft)`
  color: white;
  width: 1.1em;
  height: 1.1em;
  margin: 0em 0.35em;
`;

const RatingIcon = styled(FontAwesomeIcon).attrs({ icon: faStar })`
  margin: 0 0.25rem;
`;

const TaglineText = styled.h3`
  font: italic 600 1.25em "Titillium Web", sans-serif;
  margin-top: 0.25em;
  max-width: 90%;
`;

const Details = props => {
  const { movie, videos, addFavorite } = props;

  let genresArray = movie ? movie.genres.map(item => item.name) : null;

  const convertRuntime = num => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  const convertedRuntime = movie ? convertRuntime(movie.runtime) : null;

  const convertedReleaseDate = movie
    ? moment(movie.release_date, "YYYY-MM-DD")
    : null;

  const posterURL = "https://image.tmdb.org/t/p/original";
  const mobilePosterURL = "https://image.tmdb.org/t/p/w780";

  return (
    <>
      {console.log(videos, "videos")}
      {movie ? (
        <MasterContainer posterPath={posterURL + movie.backdrop_path}>
          <CenterContainer>
            <Header>
              <h1>{movie.title}</h1>
              <TaglineText>"{movie.tagline}"</TaglineText>
              <h2>{genresArray.join(", ")}</h2>
              <div style={{ display: "flex" }}>
                {movie.runtime !== 0 && (
                  <>
                    <h2>
                      <RuntimeIcon />
                      {convertedRuntime}
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

            <BottomContainer>
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
                <Text>{convertedReleaseDate.format("LL")}</Text>
              </DetailContainer>
            </BottomContainer>
            {console.log(videos.results)}
            {videos.results !== [] ? null : (
              <Trailer urlKey={videos.results[0].key} />
            )}

            {/*! Add ternary to show deletefavorite button if it exists in favorites list. */}
            <AddFavoriteButton onClick={() => addFavorite(movie)} />
          </CenterContainer>
        </MasterContainer>
      ) : null}
    </>
  );
};

export default connect(null, { addFavorite })(Details);
