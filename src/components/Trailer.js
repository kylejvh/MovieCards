import React, { useState } from "react";
import styled from "styled-components";

import { Play } from "styled-icons/fa-solid/Play";

// import ReactPlayer from "react-player";

const PlayButton = styled.button`
  margin: 0.5em;
  padding: 0.5em;
  border: none;
  outline: none;
  border-radius: 0.8em;
  color: white;
  font: inherit;
  font-size: 1.1rem;
  justify-self: center;
  align-self: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  text-decoration: none;
  background: #2769b4;

  :hover {
    cursor: pointer;
    transform: scale(1.1);
    background: #008080;
  }
`;

const PlayIcon = styled(Play)`
  color: white;
  width: 1.1em;
  height: 1.1em;
  margin: 0em 0.35em;
`;

const Trailer = props => {
  const { urlKey } = props;

  //   const [clicked, setClicked] = useState(false);

  const url = `https://www.youtube.com/watch?v=${urlKey}`;

  //   const handleClick = () => {
  //     // interact with react player...
  //     setClicked(true);
  //   };

  return (
    <>
      <PlayButton onClick={() => window.open(url, "_blank")}>
        <PlayIcon />
        Watch Trailer
      </PlayButton>

      {/* {clicked && (
        <div>
          <ReactPlayer
            url={url}
            playing
            onEnded={() => setClicked(false)}
          ></ReactPlayer>
        </div>
      )} */}
    </>
  );
};

export default Trailer;
