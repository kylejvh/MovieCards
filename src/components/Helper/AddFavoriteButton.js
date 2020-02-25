import React from "react";
import styled from "styled-components";

import { Plus } from "styled-icons/fa-solid/Plus";

const AddButton = styled.button`
  margin: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.8em;
  color: white;
  font-size: 1.1em;
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
  return (
    <>
      <AddButton onClick={props.onClick}>
        <PlusIcon />
        Add to List
      </AddButton>
    </>
  );
};

export default AddFavoriteButton;
