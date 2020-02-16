import React from "react";
import styled from "styled-components";

const Videos = props => {
  //     return (
  //         <div onClick={() => onVideoSelect(video)} className="video-item item" >
  //             <img
  //             className="ui image"
  //             alt={video.snippet.title}
  //             src={video.snippet.thumbnails.medium.url} />
  //             <div className="content">
  //                 <div className="header">{video.snippet.title}
  //                 </div>
  //             </div>
  //         </div>
  //         );
  //     };

  //   const RenderedVideoList = videos.map(video => {
  //     return (
  //       <VideoItem
  //         key={video.id.videoId}
  //         onVideoSelect={onVideoSelect}
  //         video={video}
  //       />
  //     );
  //     // this.setState({ video });
  //   });

  const url = `https://www.youtube.com/watch?v=`;

  const renderedVideoList = props.videos.map(video => {
    return (
      <div key={video.id}>
        <div className="ui embed">
          <iframe title="video player" src={url + video.key} />
        </div>
        <div className="ui segment">
          <h4 className="ui header">{video.title}></h4>
          <p>description?</p>
        </div>
      </div>
    );
    // this.setState({ video });
  });

  return (
    <>
      {console.log(props.videos)}

      {renderedVideoList}
    </>
  );
};

export default Videos;
