import React from "react";
import styled from "styled-components";

import { Play } from "styled-icons/fa-solid/Play";

// import ReactPlayer from "react-player";

const PlayButton = styled.button`
  margin: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.8em;
  color: white;
  font-size: 1.1em;
  transition: background 250ms ease-in-out, transform 150ms ease;
  text-decoration: none;
  background: #2769b4;

  :hover {
    cursor: pointer;
    background: #008080;
  }

  :active {
    transform: scale(1.1);
  }
`;

const PlayIcon = styled(Play)`
  color: white;
  width: 1em;
  margin: 0em 0.35em;
`;

// TMDB API returns a section of YouTube URL to specify the trailer for the respective movie.
const Trailer = ({ urlKey }) => {
  const url = `https://www.youtube.com/watch?v=${urlKey}`;

  return (
    <>
      <PlayButton onClick={() => window.open(url, "_blank")}>
        <PlayIcon />
        Watch Trailer
      </PlayButton>
    </>
  );
};

export default Trailer;
