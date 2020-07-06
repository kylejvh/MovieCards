import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { REMOVEMODE_TOGGLED } from "../actionCreators/types";

import MovieList from "../components/movielist/MovieList";

const Wrapper = styled.div`
  margin-top: 4em;

  @media screen and (max-width: 500px) {
    margin-top: 3em;
  }
`;

const PageText = styled.h1`
  font-size: 1em;
  margin: 0 6em;
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

const Favorites = ({ favorites = [], removeMode, dispatch }) => {
  useEffect(() => {
    return () => dispatch({ type: REMOVEMODE_TOGGLED, payload: false });
  }, []);

  return (
    <Wrapper>
      {favorites.length > 0 ? (
        <>
          <PageText>Your list of favorites!</PageText>
          <ButtonContainer>
            <RemoveModeButton
              onClick={() =>
                dispatch({ type: REMOVEMODE_TOGGLED, payload: !removeMode })
              }
            >
              {removeMode ? "Disable Remove Mode" : "Enable Remove Mode"}
            </RemoveModeButton>
          </ButtonContainer>

          <MovieList showFavorites={true} />
        </>
      ) : (
        <PageText>
          You have no favorites! Add favorites to quickly access them here.
        </PageText>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites.favoritesList,
    removeMode: state.favorites.removeMode,
  };
};

export default connect(mapStateToProps)(Favorites);
