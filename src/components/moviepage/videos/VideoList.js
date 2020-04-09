import React from "react";
import VideoItem from "./VideoItem";
import { connect } from "react-redux";

const VideoList = ({ videos = [] }) => {
  return (
    <>
      {videos.map(video => {
        return <VideoItem key={video.id} video={video} />;
      })}
    </>
  );
};

const mapStateToProps = state => {
  return {
    videos: state.trailers.trailers
  };
};

export default connect(mapStateToProps)(VideoList);
