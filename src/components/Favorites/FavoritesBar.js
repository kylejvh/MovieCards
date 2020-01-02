import React, { useState } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const RemoveButton = styled.button`
  margin: 0.5em;
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
    transform: scale(1.1);
    background: #008080;
  }
`;

const ConfirmButton = styled(RemoveButton)``;
const SelectAllButton = styled(RemoveButton)``;
const SelectNoneButton = styled(RemoveButton)``;

const FavoritesBar = props => {
  // need a button for
  // Remove Mode
  // Remove Confirm
  // Remove Select Checkbox
  // On click of input checkbox, delete the entry from mylist.
  // do this in an immutable fashion?

  return (
    <ButtonContainer>
      removecontainer
      <RemoveButton onClick={props.onFavClick}>Remove Favorites</RemoveButton>
      {props.removeMode && <p>Select movies to remove.</p>}
      {/* <SelectAllButton>Select All</SelectAllButton> should change ischecked to
      true */}
      <SelectNoneButton>Select None</SelectNoneButton>
      <ConfirmButton onClick={() => props.removeFavorites}>
        Confirm Remove?
      </ConfirmButton>
    </ButtonContainer>
  );
};

export default FavoritesBar;
