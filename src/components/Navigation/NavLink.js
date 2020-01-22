import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const StyledLink = styled(Link)`
  border: 1px solid #7ca887;
  border: none;
  box-shadow: 0 0.22em #151c24;
  background: none;
  margin: 1em 0.35em 0 0.35em;
  padding: 0 0.5em 0.2em;
  outline: none;
  text-decoration: none;

  font-size: 1.25em;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: #7ca887;

  :hover {
    cursor: pointer;
  }
`;

const NavLink = props => (
  <StyledLink
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          boxShadow: isCurrent ? "0em 0.2em teal" : " "
        }
      };
    }}
  />
);

export default NavLink;
