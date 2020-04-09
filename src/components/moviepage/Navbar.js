import React from "react";
import { connect } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const StyledLink = styled(NavLink)`
  border: 1px solid #7ca887;
  border: none;

  background: none;
  margin: 0 1.35rem;
  padding-bottom: 0.05rem;
  outline: none;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: rgb(135, 135, 135);

  :hover {
    cursor: pointer;
  }
`;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: center;
  position: absolute;

  z-index: 999;
  bottom: 0;
  left: 0;
  padding: 0.5rem 0;

  width: 100%;

  background: rgba(0, 0, 0, 0.65);

  /* @media screen and (min-width: 1824px) {
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
  } */
`;

const activeStyle = {
  boxShadow: "0em 0.2em teal",
  color: "white"
};

const Navbar = ({ backdrops, videos }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  let { url } = useRouteMatch();

  return (
    <StyledNavbar>
      <StyledLink exact to={`${url}/details`} activeStyle={activeStyle}>
        Details
      </StyledLink>
      <StyledLink to={`${url}/credits`} activeStyle={activeStyle}>
        Cast & Crew
      </StyledLink>
      {backdrops.length > 0 && (
        <StyledLink to={`${url}/images`} activeStyle={activeStyle}>
          Images
        </StyledLink>
      )}
      {videos.length > 0 && (
        <StyledLink to={`${url}/videos`} activeStyle={activeStyle}>
          Videos
        </StyledLink>
      )}
      {/* <StyledLink to={`${url}/recommended`} activeStyle={activeStyle}>
        More Like This...
      </StyledLink> */}
    </StyledNavbar>
  );
};

const mapStateToProps = state => {
  return {
    backdrops: state.movie.images.backdrops,
    videos: state.movie.videos.results
  };
};

export default connect(mapStateToProps)(Navbar);
