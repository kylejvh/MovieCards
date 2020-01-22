import React, { useContext } from "react";
import styled from "styled-components";

import { CTX } from "../Store/Store";

import { Delete } from "styled-icons/material/Delete";

const DeleteButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.88);
  color: red;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: none;
`;

const DeleteIcon = styled(Delete)`
  :hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;

const RemoveFavoriteButton = props => {
  const { state, dispatch } = useContext(CTX);

  const { favorites } = state;

  // Returns an array with values that don't include movie id of movie that was clicked for removal.
  const handleRemoveFavorite = () => {
    const newFavorites = favorites.filter(item => item.id !== props.movie.id);

    dispatch({ type: "REMOVED_FAVORITE", payload: newFavorites });
  };

  return (
    <DeleteButton onClick={handleRemoveFavorite}>
      <DeleteIcon />
    </DeleteButton>
  );
};

export default RemoveFavoriteButton;
