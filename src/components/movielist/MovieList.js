import React from "react";
import { connect } from "react-redux";
import { Trail, Spring } from "react-spring/renderprops";
import { useTrail, animated } from "react-spring";

import styled from "styled-components";

import MovieCard from "./MovieCard";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 3em 3.5em;

  @media screen and (max-width: 3000px) {
    padding: 2em 2.5em;
  }

  @media screen and (max-width: 2000px) {
    padding: 2em 2.5em;
  }

  @media screen and (max-width: 1440px) {
    padding: 1.5em;
  }

  @media screen and (max-width: 1025px) {
    padding: 1em 0.65em;
  }

  @media screen and (max-width: 640px) {
    padding: 0.35em;
  }

  @media screen and (max-width: 361px) {
    padding: 0.25em;
  }
`;

const config = { mass: 5, tension: 2000, friction: 200 };

const MovieList = ({ movies, favorites, showFavorites = false }) => {
  let renderedList = showFavorites ? favorites : movies;

  // const trail = useTrail(renderedList.length, {
  //   config,
  //   opacity: 1,
  //   x: 20,
  //   height: 0,
  //   from: { opacity: 0, x: 20, height: 0 },
  // });

  // const trail2 = useTrail(items.length, {
  //   config,
  //   opacity: toggle ? 1 : 0,
  //   x: toggle ? 0 : 20,
  //   height: toggle ? 80 : 0,
  //   from: { opacity: 0, x: 20, height: 0 },
  // });
  // const animatedMovieCards = useTrail(renderedList.length, {
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  // });

  // const MovieCards = renderedList.map((movie) => (
  //   <AnimatedMovieCard key={movie.id} movie={movie}></AnimatedMovieCard>
  // ));

  return (
    <MovieContainer>
      <Trail
        config={config}
        items={renderedList}
        keys={(movie) => movie.id}
        from={{
          opacity: 0,
        }}
        to={{ opacity: 1 }}
      >
        {(movie) => (props) => (
          <>
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          </>
        )}
      </Trail>
    </MovieContainer>
  );
};

const mapStateToProps = ({ movies, favorites }) => ({
  movies: movies.movies,
  favorites: favorites.favoritesList,
});

export default connect(mapStateToProps)(MovieList);
