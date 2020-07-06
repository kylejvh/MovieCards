import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addFavorite } from "../../actionCreators/addFavorite";
import { removeFavorite } from "../../actionCreators/removeFavorite";
import { ChevronLeft } from "styled-icons/material/ChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { Plus } from "styled-icons/fa-solid/Plus";
import { Delete } from "styled-icons/material/Delete";

import moment from "moment";

import CustomButton from "../Helper/CustomButton";
import Trailer from "../Helper/Trailer";

const ButtonContainer = styled.div`
  margin: 1em 0 0 0;
  display: flex;

  @media screen and (max-width: 1023px) {
    margin: 0 auto;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  /* background: rgba(0, 0, 0, 0.93); */

  /* linear-gradient(
     0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  ); */
  /* box-shadow: 0 0 5px 15px rgba(0, 0, 0, 0.93); */

  margin: 3rem 1.5rem;

  @media screen and (max-width: 1023px) {
    font-size: 14px;
    width: calc(100% - 7em);
    height: calc(100% - 3.5em);
    margin: 0 3.5em 3.5em 3.5em;
    justify-content: flex-end;
    align-items: stretch;
  }

  @media screen and (max-width: 599px) {
    font-size: 12px;
    width: calc(100% - 3em);
    height: calc(100% - 3.5em);
    margin: 0 1.5em 3.5em 1.5em;
    justify-content: flex-end;
    align-items: stretch;
  }
`;

const BottomContainer = styled.div`
  display: flex;

  @media screen and (max-width: 1500px) and (min-width: 1024px) {
    flex-flow: column;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em 1em 1em 1em;

  @media screen and (max-width: 1500px) {
    margin: 0.75em auto;
    text-align: left;
  }
`;

const Header = styled.div`
  margin-bottom: 1em;

  @media screen and (max-width: 1023px) {
    margin-bottom: 0.5em;
  }

  h1 {
    font-family: "Titillium Web", sans-serif;
    font-size: 3.5em;
    text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
      4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
    margin: 0 0 0.25em 0;
    padding: 0;

    @media screen and (max-width: 1023px) {
      font-size: 1.667em;
    }
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
  margin: 0;
`;

const MoviePlot = styled.div`
  margin-top: 3em;

  h1 {
    font-size: 1.25em;
    margin: 0.1em 0;
  }

  p {
    font-size: 1em;
    line-height: 1.4;
    width: 85%;
  }

  @media screen and (max-width: 1023px) {
    margin-top: 0.5em;

    p {
      width: 100%;
    }
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
  font: italic 600 1.75em "Titillium Web", sans-serif;
  text-align: center;
  max-width: 85%;
  margin: 1em 1em 1em 0;

  :before {
    color: grey;
    content: open-quote;
    font-size: 2em;
    line-height: 0.1em;
    margin-right: 0.2em;
    vertical-align: -0.2em;
  }

  :after {
    color: grey;
    content: close-quote;
    font-size: 2em;
    line-height: 0.1em;
    margin-left: 0.1em;
    vertical-align: -0.2em;
  }

  @media screen and (max-width: 1023px) {
    text-align: left;
    font-size: 1.5em;
  }

  @media screen and (max-width: 799px) {
    display: none;
  }
`;

const PlusIcon = styled(Plus)`
  color: white;
  width: 1.1em;
  height: 1.1em;
  margin: 0em 0.35em;
`;

const DeleteIcon = styled(Delete)`
  color: white;
  width: 1.5em;
  height: 1.5em;
  margin: 0 0.35em;
`;

const Details = ({
  movie = [],
  videos = [],
  favorites = [],
  addFavorite,
  removeFavorite,
}) => {
  let genresArray = movie ? movie.genres.map((item) => item.name) : null;

  const convertRuntime = (num) => {
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

  let isInFavorites = false;
  if (favorites.find((item) => item.id === movie.id)) {
    isInFavorites = true;
  }

  const posterURL = "https://image.tmdb.org/t/p/original";
  const mobilePosterURL = "https://image.tmdb.org/t/p/w780";

  return (
    <>
      {movie ? (
        <CenterContainer>
          <Header>
            <h1>{movie.title}</h1>
            {movie.tagline && <TaglineText>{movie.tagline}</TaglineText>}
            <h2>{genresArray.join(", ")}</h2>
            <div style={{ display: "flex", marginTop: ".35em" }}>
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

          <ButtonContainer>
            {/*!! The below code cannot use === [], because arrays are stored by reference, and matching videos.results to [] will eval to false, because they are not the same reference in memory.
            You should use if (array.property.length), 
            because the prop exists and its length is 0, it will be falsey.
            If it doesn't exist, falsey.
            If it's > 0, it will be truthy.
            */}
            {/* {videos.results.length ? (
              <Trailer urlKey={videos.results[0].key} />
             : null )} */}

            <CustomButton
              title={isInFavorites ? "Remove from List" : "Add to List"}
              icon={isInFavorites ? <DeleteIcon /> : <PlusIcon />}
              cypressId={isInFavorites ? "removeFavorite" : "addFavorite"}
              onClick={() =>
                isInFavorites ? removeFavorite(movie) : addFavorite(movie)
              }
            ></CustomButton>
          </ButtonContainer>
        </CenterContainer>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ movie, favorites }) => ({
  movie: movie.movie,
  videos: movie.videos,
  favorites: favorites.favoritesList,
});

export default connect(mapStateToProps, { addFavorite, removeFavorite })(
  Details
);
