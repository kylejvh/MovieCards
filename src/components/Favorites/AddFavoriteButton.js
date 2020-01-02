import React from "react";
import styled from "styled-components";

// import { Play } from "styled-icons/fa-solid/Play";

const AddButton = styled.button`
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

// const AddIcon = styled(Play)`
//   color: white;
//   width: 1.1em;
//   height: 1.1em;
//   margin: 0em 0.35em;
// `;

const AddFavoriteButton = props => {
  // on click, add movie to array.

  return (
    <>
      <AddButton>Add to My List</AddButton>
    </>
  );
};

export default AddFavoriteButton;
