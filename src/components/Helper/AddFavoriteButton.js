import React, { useContext } from "react";
import styled from "styled-components";

import { Plus } from "styled-icons/fa-solid/Plus";
import { CTX } from "../Store/Store";

const AddButton = styled.button`
  margin: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.8em;
  color: white;
  font-size: 1.1rem;
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

const PlusIcon = styled(Plus)`
  color: white;
  width: 1.1em;
  height: 1.1em;
  margin: 0em 0.35em;
`;

const AddFavoriteButton = props => {
  //! Add duplicate error message/feedback.
  const { dispatch } = useContext(CTX);
  const { movie, favorites } = props;

  const handleAddFavorite = () => {
    if (favorites.length === 0) {
      // If no favorites exist, clone the movie and copy into newArray.
      let newArray = favorites.slice();
      let deepClone = JSON.parse(JSON.stringify(movie));
      newArray = [...newArray, deepClone];

      return dispatch({ type: "ADDED_FAVORITE", payload: newArray });
    } else if (favorites.length > 0) {
      let newArray = favorites.slice();
      if (newArray.find(item => item.id === movie.id)) {
        return console.log("match found via find");
      }
      // If no duplicates exist, add to favorites list.

      let deepClone = JSON.parse(JSON.stringify(movie));
      newArray = [...newArray, deepClone];
      return dispatch({ type: "ADDED_FAVORITE", payload: newArray });
    }
  };

  return (
    <>
      <AddButton onClick={handleAddFavorite}>
        <PlusIcon />
        Add to List
      </AddButton>
    </>
  );
};

export default AddFavoriteButton;
