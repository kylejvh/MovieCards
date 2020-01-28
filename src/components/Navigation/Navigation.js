import React from "react";
import styled from "styled-components";
import NavLink from "./NavLink";
import { useMediaQuery } from "react-responsive";

const StyledNavbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 1em 1em 1em;

  @media screen and (min-width: 1824px) {
    font-size: 24px;
    margin-left: 3.5em;
  }

  @media screen and (max-width: 700px) {
    font-size: 18px;
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

const Navigation = props => {
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });
  return (
    <StyledNavbar>
      <NavLink to="/">{isMobile ? "Popular" : "Popular Movies"}</NavLink>
      <NavLink to="/upcoming">
        {isMobile ? "Upcoming" : "Upcoming Movies"}
      </NavLink>
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      {/* <NavLink to="/byactor" buttonTitle="Discover by Actor" </NavLink> */}
    </StyledNavbar>
  );
};

export default Navigation;
