import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const activeClassName = "active"; // React Router NavLink default active link className

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  border: 1px solid #7ca887;
  border: none;
  box-shadow: 0em 0.2em #151c24;
  background: none;
  margin: 1em 0 0 0.5em;
  padding: 0 0.5em 0.2em;
  outline: none;
  text-decoration: none;
  font: inherit;
  font-size: 1.25em;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: #7ca887;

  :hover {
    cursor: pointer;
  }

  &.${activeClassName} {
    box-shadow: 0em 0.2em teal;
  }
`;

const HeaderLink = props => {
  // .form-container button:hover {
  //   transform: scale(1.15);
  //   background: #2769b4;
  //   color: black;
  //   border-radius: 10;
  // }}

  return (
    <StyledNavLink exact to={`${props.to}`}>
      {props.buttonTitle}
    </StyledNavLink>
  );
};

export default HeaderLink;
