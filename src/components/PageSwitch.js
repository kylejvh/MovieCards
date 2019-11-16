import React from "react";

import styled from "styled-components";

// import MovieCard from "../components/MovieCard/MovieCard";
// import Navigation from "../components/Navigation/Navigation";
// import Search from "../components/Search";

const StyledDiv = styled.div`
  display: flex;
  width: 10rem;
  height: 2rem;
  background-color: #151c24;
`;

// on button click, increment state to increase the page queried through existing usestate
// grab page data in home.js, store in state.
// render the amount of pages availabe based on the state.

// take in on search submit?

const StyledNumButton = styled.button``;

const StyledNextButton = styled.button`
  background: none;
  color: white;
  border: none;
  outline: none;
  align-self: center;

  :hover {
    cursor: pointer;
  }
`;

const StyledPreviousButton = styled.button``;

// const onButtonClick = (props) => {

//     )
// }

// useEffect({
//     if(props.pageData.currentPage )
// })

const PageSwitch = props => {
  const { pageData } = props;

  return (
    <>
      <StyledDiv>
        <StyledNextButton>Load More Results</StyledNextButton>
      </StyledDiv>
    </>
  );
};

export default PageSwitch;
