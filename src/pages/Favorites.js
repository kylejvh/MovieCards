import React, { useState } from "react";
import styled from "styled-components";

import MovieCard from "../components/MovieCard/MovieCard";
import { connect } from "react-redux";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  @media screen and (max-width: 3000px) {
    justify-content: center;
  }

  @media screen and (max-width: 2000px) {
    justify-content: center;
  }
`;

const PageText = styled.h1`
  font-size: 1.5em;
  margin: 1.5em 1em 0 1em;
  color: #7ca579;
`;

const RemoveModeButton = styled.button`
  margin: 0.5em 0em 2em 1em;
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

    background: #008080;
  }

  :active {
    transform: scale(1.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Favorites = ({ favorites }) => {
  const [toggleRemove, setToggleRemove] = useState(false);

  const renderFavorites = favorites.map(movie => (
    <MovieCard key={movie.id} movie={movie} removeMode={toggleRemove} />
  ));

  return (
    <>
      {console.log(favorites, "favortires")}
      {favorites.length > 0 ? (
        <>
          <PageText>Your list of favorites!</PageText>
          <ButtonContainer>
            <RemoveModeButton onClick={() => setToggleRemove(!toggleRemove)}>
              {toggleRemove ? "Disable Remove Mode" : "Enable Remove Mode"}
            </RemoveModeButton>
          </ButtonContainer>

          <MovieContainer>{renderFavorites}</MovieContainer>
        </>
      ) : (
        <PageText>
          You have no favorites! Add favorites to quickly access them here.
        </PageText>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    favorites: state.favorites.favorites
  };
};

export default connect(mapStateToProps)(Favorites);
