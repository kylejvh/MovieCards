import React from "react";
import styled from "styled-components";

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

const RemoveFavoriteButton = ({ onClick }) => {
  return (
    <DeleteButton onClick={onClick}>
      <DeleteIcon />
    </DeleteButton>
  );
};

export default RemoveFavoriteButton;
