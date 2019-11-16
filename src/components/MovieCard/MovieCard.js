import React, { useState } from "react";

import styled from "styled-components";

import AltPoster from "./posterplaceholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";

import "./moviecard.css";

const CardContainer = styled.div`
  position: relative;

  flex: 1 0 15%;
  margin: 1.5vw 1vw;
  border-radius: 10px 10px 0 0;
  transition: transform;
  transition-duration: 0.25s;
  color: white;

  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (max-width: 1025px) {
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
  text-shadow: #2c3949;
  margin: 0.25rem;
  padding: 0.3rem;
  border-radius: 10%;
  background-color: rgba(0, 0, 0, 0.808);
`;

const RuntimeIcon = styled(FontAwesomeIcon).attrs({ icon: faStopwatch })`
  font-size: 1em;
`;

const StyledRating = styled.div`
  position: absolute;
  top: 0;
  /* text-shadow: #2c3949; */
  margin: 0.25rem;
  padding: 0.3rem;
  border-radius: 10%;
  background-color: rgba(0, 0, 0, 0.808);
`;

const RatingIcon = styled(FontAwesomeIcon).attrs({ icon: faStar })`
  color: gold;
  margin: 0 0.5rem 0 0;
`;

const MovieCard = props => {
  // !! Potential hover effect to be added later
  const [isHovering, setIsHovering] = useState(false);

  const { poster_path, title, release_date, vote_average, id } = props.movie;
  const { runtime, genres } = props.movie.details;

  const imageURL = `https://image.tmdb.org/t/p/w780${poster_path}`;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const bottomDiv = (
    <div className="bottom-div">
      <p>Releases: {release_date}</p>
    </div>
  );

  return (
    <CardContainer>
      <StyledImg
        src={poster_path ? imageURL : AltPoster}
        onClick={() => props.handleMovieClick(id)}
        alt={`${title} poster`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {runtime && (
        <StyledRuntime>
          <RuntimeIcon />
          {runtime + " min"}
        </StyledRuntime>
      )}
      {vote_average !== 0 && (
        <StyledRating>
          <RatingIcon />
          {vote_average}
        </StyledRating>
      )}
    </CardContainer>

    //     {isHovering && bottomDiv}
    //   </div>
    //   {/* <div className="moviedata-container">
    //     <div>
    //       <h4>
    //         {release_date}
    //         {genres.map(item => {
    //           return item.name + ", ";
    //         })}
    //       </h4>
    //       <h1>{title}</h1>
    //     </div>
    //     <p>{overview}</p>
    //   </div> */}
    // </div>
  );
};

export default MovieCard;
