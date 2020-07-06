import React from "react";

import { connect } from "react-redux";
import { onVideoSelect } from "../../../actionCreators/onVideoSelect";

import { PlayCircle } from "styled-icons/fa-regular/PlayCircle";
import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;

  flex: 1 0 15%;
  padding: 1em 0;
  margin: 0 0.5em;

  @media screen and (max-width: 1023px) {
    flex: 0 0 auto;
  }
`;

const VideoThumbnail = styled.img`
  transition: all 300ms ease;

  max-width: 280px;
  width: 100%;
  height: 100%;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const PlayButton = styled.button`
  position: absolute;
  width: 4em;
  bottom: calc(50% - 2em);
  left: calc(50% - 2em);

  color: white;

  background: none;
  outline: none;
  border: none;
  transition: all 200ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    background-color: rgb(250, 185, 185);
  }
`;

const PlayIcon = styled(PlayCircle)``;

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <VideoWrapper onClick={() => onVideoSelect(video)}>
      <VideoThumbnail
        alt={video.snippet.title}
        src={video.snippet.thumbnails.medium.url}
      />
      {/* <PlayButton onClick={() => onVideoSelect(video)}>
        <PlayCircle />
      </PlayButton> */}

      {/* <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div> */}
    </VideoWrapper>
  );
};

export default connect(null, { onVideoSelect })(VideoItem);
