import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "typeface-roboto";

import { API_KEY } from "../api/key";
import { fetchMovie } from "../actions";
import Details from "../components/newmoviepage/Details";
import Screenshots from "../components/newmoviepage/Screenshots";
import Credits from "../components/newmoviepage/Credits";
import Loader from "../components/Helper/Loader";

const NewMoviePage = props => {
  const { movie, videos, images, credits, clickedMovieId, fetchMovie } = props;
  const url = `https://api.themoviedb.org/3/movie/${clickedMovieId}?api_key=${API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  useEffect(() => {
    fetchMovie(url);
  }, []);

  let renderMoviePage;
  if (movie && videos && credits && images) {
    renderMoviePage = (
      <>
        <Details movie={movie} videos={videos} />

        <Screenshots movie={movie} />
        <Credits credits={credits} />
      </>
    );
  } else {
    renderMoviePage = <Loader />;
  }

  return (
    <>
      {renderMoviePage}
      <div>Rendered the new movie page</div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, "ownprops");
  return {
    movie: state.movie.movie,
    images: state.movie.images,
    videos: state.movie.videos,
    credits: state.movie.credits,
    clickedMovieId: state.redirect.clickedMovieId
  };
};

export default connect(mapStateToProps, { fetchMovie })(NewMoviePage);
