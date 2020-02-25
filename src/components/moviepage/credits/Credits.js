import React from "react";
import styled from "styled-components";

import Cast from "./Cast";
import Crew from "./Crew";

const Wrapper = styled.div`
  display: flex;

  height: 100%;
  width: 100%;

  @media screen and (max-width: 1023px) {
    flex-flow: column;
    width: 100%;
    align-items: stretch;
  }

  @media screen and (max-width: 499px) {
    font-size: 14px;
  }
`;

const Credits = () => {
  return (
    <Wrapper>
      <Crew />
      <Cast />
    </Wrapper>
  );
};

export default Credits;
