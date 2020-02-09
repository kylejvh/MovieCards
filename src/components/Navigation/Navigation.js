import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const StyledNavbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 1rem;

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

const Navigation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const activeStyle = {
    boxShadow: "0em 0.2em teal"
  };

  return (
    <StyledNavbar>
      <StyledLink exact to="/" activeStyle={activeStyle}>
        {isMobile ? "Popular" : "Popular Movies"}
      </StyledLink>
      <StyledLink to="/upcoming" activeStyle={activeStyle}>
        {isMobile ? "Upcoming" : "Upcoming Movies"}
      </StyledLink>
      <StyledLink to="/search" activeStyle={activeStyle}>
        Search
      </StyledLink>
      <StyledLink to="/favorites" activeStyle={activeStyle}>
        Favorites
      </StyledLink>
      {/* <StyledLink to="/byactor" buttonTitle="Discover by Actor"  activeStyle={activeStyle} </StyledLink> */}
    </StyledNavbar>
  );
};

export default Navigation;
