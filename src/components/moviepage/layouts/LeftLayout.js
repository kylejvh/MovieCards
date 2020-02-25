import React from "react";
import styled from "styled-components";

const Content = styled.div`
  height: 100vh;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  height: 100%;
`;

const Left = styled.div`
  background: black;
  width: 30%;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    background-image: linear-gradient(to right, #000, transparent);
    top: 0;
    bottom: 0;
    left: 100%;
    width: 275px;
  }
`;

const Right = styled.div`
  background: no-repeat center url(${props => props.posterPath});
  background-size: cover;

  width: 70%;
`;

const ContentContainer = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
`;

const LeftLayout = ({ children, backdropImage }) => {
  return (
    <Content>
      <Background>
        <Left></Left>
        <Right
          //   conditionalBgGradient={gradientChange}
          posterPath={backdropImage}
        ></Right>
      </Background>
      <ContentContainer>{children}</ContentContainer>
    </Content>
  );
};

export default LeftLayout;
