import React from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";

import { handleMovieClick, removeFavorite } from "../../actions";
import AltPoster from "./posterplaceholder.jpg";
import RemoveFavoriteButton from "../Helper/RemoveFavoriteButton";

const CardContainer = styled.div`
  position: relative;
  flex: 0 0 9%;
  display: flex;
  justify-content: space-around;

  margin: 1.55vw 1vw;
  border-radius: 10px 10px 0 0;
  transition: transform;
  transition-duration: 0.25s;
  color: white;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
  }

  @media screen and (max-width: 3000px) {
    flex: 0 0 10%;
  }

  @media screen and (max-width: 2000px) {
    flex: 0 0 13%;
  }

  @media screen and (max-width: 1440px) {
    flex: 1 0 15%;
  }

  @media screen and (max-width: 1025px) {
    flex: 1 0 25%;
  }

  @media screen and (max-width: 640px) {
    flex: 1 0 25%;
  }

  @media screen and (max-width: 361px) {
    flex: 1 0 33%;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledRuntime = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.25rem;
  padding: 0.3rem;
  border-radius: 10%;
  background-color: rgba(0, 0, 0, 0.808);
`;

const RuntimeIcon = styled(FontAwesomeIcon).attrs({ icon: faStopwatch })`
  font-size: 1em;
  margin: 0 0.25rem 0 0;
`;

const StyledRating = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0.25rem;
  padding: 0.3rem;
  border-radius: 10%;
  background-color: rgba(0, 0, 0, 0.808);
`;

const RatingIcon = styled(FontAwesomeIcon).attrs({ icon: faStar })`
  color: gold;
  margin: 0 0.25rem 0 0;
`;

const MovieCard = props => {
  const { path } = useRouteMatch();

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const { poster_path, title, vote_average, id } = props.movie;

  let runtime;
  if (props.movie.details) {
    runtime = props.movie.details.runtime;
  } else {
    runtime = props.movie.runtime;
  }

  const imageURL = `https://image.tmdb.org/t/p/w780${poster_path}`;

  const convertRuntime = num => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  const convertedRuntime = convertRuntime(runtime);

  let renderRuntime;
  if (!isMobile && runtime !== 0) {
    renderRuntime = (
      <StyledRuntime>
        <RuntimeIcon />
        {convertedRuntime}
      </StyledRuntime>
    );
  }

  let renderRating;
  if (!isMobile && vote_average !== 0) {
    renderRating = (
      <StyledRating>
        <RatingIcon />
        {vote_average}
      </StyledRating>
    );
  }

  return (
    <CardContainer>
      <StyledImg
        src={poster_path ? imageURL : AltPoster}
        onClick={() => props.handleMovieClick(id, path)}
        alt={`${title} poster`}
      />
      {renderRuntime}
      {renderRating}
      {props.removeMode && (
        <RemoveFavoriteButton
          onClick={() => props.removeFavorite(props.movie)}
        />
      )}
    </CardContainer>
  );
};

export default connect(null, { handleMovieClick, removeFavorite })(MovieCard);
