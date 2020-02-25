import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Searchbar from "../Helper/Searchbar";

const StyledLink = styled(NavLink)`
  border: 1px solid #7ca887;
  border: none;

  box-shadow: 0 0.22em #151c24;
  background: none;
  margin: 0em 1.15em;
  padding: 0 0.5em 0.2em;
  outline: none;
  text-decoration: none;

  font-size: 1.05em;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  :hover {
    cursor: pointer;
    opacity: 75%;
  }
`;

const StyledNavbar = styled.nav`
  display: flex;
  /* background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.8)
  ); */
  position: absolute;
  top: 0;

  z-index: 999;
  width: 100%;
  justify-content: flex-end;
  background: ${props => (props.linkStyle ? "rgba(0, 0, 0, 0.65)" : "none")};

  padding: 0.5em 0;

  ${StyledLink} {
    color: ${props => (props.linkStyle ? "white" : "#7ca887")};
    box-shadow: ${props => (props.linkStyle ? "none" : "0 0.22em #151c24")};
  }

  @media screen and (min-width: 1824px) {
    font-size: 18px;
  }

  @media screen and (max-width: 700px) {
    font-size: 16px;
    justify-content: center;

    ${StyledLink} {
      margin: 0 0.75em;
    }
  }

  @media screen and (max-width: 480px) {
    justify-content: center;
    font-size: 14px;

    ${StyledLink} {
    }
  }

  @media screen and (max-width: 375px) {
    justify-content: center;
    font-size: 12px;

    ${StyledLink} {
      margin: 0 0.3em;
    }
  }
`;

const Navigation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const activeStyle = {
    boxShadow: "0em 0.2em teal"
  };

  let location = useLocation();

  const rootLocations = ["/popular", "/upcoming", "/search", "/favorites"];

  const [linkStyle, setLinkStyle] = useState(false);

  const changeLinksforLocation = location => {
    if (rootLocations.find(path => path === `${location.pathname}`)) {
      return setLinkStyle(false);
    } else {
      return setLinkStyle(true);
    }
  };

  useEffect(() => {
    changeLinksforLocation(location);
  }, [location]);

  // if route match,
  // render in place searchbar that will redirect to search page and enter query...

  return (
    <StyledNavbar linkStyle={linkStyle}>
      <StyledLink exact to="/popular" activeStyle={activeStyle}>
        {isMobile ? "Popular" : "Popular Movies"}
      </StyledLink>
      <StyledLink to="/upcoming" activeStyle={activeStyle}>
        {isMobile ? "Upcoming" : "Upcoming Movies"}
      </StyledLink>
      <StyledLink to="/favorites" activeStyle={activeStyle}>
        Favorites
      </StyledLink>
      {location.pathname === "/search" ? (
        <StyledLink to="/search" activeStyle={activeStyle}>
          Search
        </StyledLink>
      ) : (
        <Searchbar inline />
      )}
      {/* <StyledLink to="/byactor" buttonTitle="Discover by Actor"  activeStyle={activeStyle} </StyledLink> */}
    </StyledNavbar>
  );
};

export default Navigation;
