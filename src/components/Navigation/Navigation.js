import React from "react";
import styled from "styled-components";

import HeaderLink from "./HeaderLink";

const StyledNavbar = styled.div`
  display: flex;
  margin: 1em;

  @media screen and (max-width: 480px) {
    font-size: 0.5em;
  }
`;

const Navigation = props => {
  return (
    <StyledNavbar>
      <HeaderLink to="/" buttonTitle="Search" />
      <HeaderLink to="/upcoming" buttonTitle="Upcoming Movies" />
      <HeaderLink to="/popular" buttonTitle="Popular Movies" />
      {/* <HeaderLink to="/byactor" buttonTitle="Discover by Actor" /> */}
    </StyledNavbar>
  );
};

export default Navigation;
