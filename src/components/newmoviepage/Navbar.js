import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const StyledNavbar = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0.5em;
  width: 100%;

  @media screen and (min-width: 1824px) {
    font-size: 24px;
  }

  @media screen and (max-width: 700px) {
    font-size: 16px;
    justify-content: center;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    justify-content: center;
  }

  @media screen and (max-width: 380px) {
    font-size: 12px;
    justify-content: center;
  }
`;

const StyledLink = styled(NavLink)`
  border: 1px solid #7ca887;
  border: none;

  background: none;
  margin: 0 1.5em;
  padding-bottom: 0.2em;
  outline: none;
  text-decoration: none;

  font-size: 1.25em;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: rgb(135, 135, 135);

  :hover {
    cursor: pointer;
  }
`;

const Navbar = props => {
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const activeStyle = {
    boxShadow: "0em 0.2em teal",
    color: "white"
  };

  let { url } = useRouteMatch();

  return (
    <StyledNavbar>
      <StyledLink exact to={`${url}`} activeStyle={activeStyle}>
        Details
      </StyledLink>
      <StyledLink to={`${url}/credits`} activeStyle={activeStyle}>
        Cast & Crew
      </StyledLink>
      <StyledLink to={`${url}/images`} activeStyle={activeStyle}>
        Images
      </StyledLink>
      <StyledLink to={`${url}/videos`} activeStyle={activeStyle}>
        Videos
      </StyledLink>
      {/* <StyledLink to={`${url}/recommended`} activeStyle={activeStyle}>
        More Like This...
      </StyledLink> */}
    </StyledNavbar>
  );
};

export default Navbar;
