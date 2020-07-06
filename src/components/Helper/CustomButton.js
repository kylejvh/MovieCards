import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
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

const CustomButton = ({ icon, title, onClick, cypressId }) => {
  return (
    <>
      <StyledButton onClick={onClick} data-cy={cypressId}>
        {icon}
        {title}
      </StyledButton>
    </>
  );
};

export default CustomButton;
