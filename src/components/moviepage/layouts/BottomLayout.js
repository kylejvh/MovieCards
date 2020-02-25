import React from "react";
import styled from "styled-components";

const Content2 = styled.div`
  height: 100vh;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;
`;

const Bot = styled.div`
  background: black;
  height: 35%;
  width: 100vw;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    background-image: linear-gradient(to top, #000, transparent);
    bottom: 100%;

    height: 275px;
    width: 100vw;
  }

  @media screen and (max-width: 420px) {
    height: 55%;
  }
`;

const Top = styled.div`
  background: top center url(${props => props.posterPath});
  background-size: cover;

  height: 65%;
  width: 100vw;
`;

const ContentContainer2 = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const BottomLayout = props => {
  return (
    <Content2>
      <Background>
        <Top
          // conditionalBgGradient={gradientChange}
          posterPath={props.backdropImage}
        ></Top>
        <Bot></Bot>
      </Background>
      <ContentContainer2>{props.children}</ContentContainer2>
    </Content2>
  );
};

export default BottomLayout;
