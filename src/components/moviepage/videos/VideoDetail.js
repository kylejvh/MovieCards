import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const YetAnotherDiv = styled.div`
  align-self: center;
  margin-top: 5.5em;

  width: 40%;

  @media screen and (max-width: 1279px) {
    width: 80%;
    margin: auto 0;
  }
`;

const PlayerWrapper = styled.div`
  position: relative;
  max-width: 100%;
  height: 0;
  overflow: hidden;

  padding-bottom: 56.25%;

  /* margin: 5em auto auto auto; */

  /* @media screen and (max-width: 1279px) {
    width: 90%;
    margin: auto auto 0 auto;
  } */
`;

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const VideoDetail = ({ video }) => {
  const videoSrc = `https://www.youtube.com/embed/${video.id}`;

  return (
    <YetAnotherDiv>
      <PlayerWrapper>
        <VideoPlayer
          title="video player"
          src={videoSrc}
          allowFullScreen
          frameBorder="0"
        ></VideoPlayer>
      </PlayerWrapper>
    </YetAnotherDiv>
  );
};

const mapStateToProps = state => {
  return {
    video: state.trailers.clickedVideo
  };
};

export default connect(mapStateToProps)(VideoDetail);
