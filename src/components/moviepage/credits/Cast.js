import React from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";

import { useScroll } from "react-use-gesture";

import ComposedScrollContainer from "../ComposedScrollContainer";
import styled from "styled-components";

import AltPoster from "../../movielist/posterplaceholder.jpg";

const Heading = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 1.25em;
  font-weight: 600;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0 2.5em 1em 2.5em;
  padding: 0;
`;

const Wrapper = styled.div`
  margin: auto 0 3.5em 0;
  max-width: 65%;

  @media screen and (max-width: 1023px) {
    max-width: 100%;
    margin-bottom: 2em;
    margin-top: 1em;
  }
`;
const CastWrapper = styled.div``;

const AnimatedCastCard = styled(animated.div)`
  /* NEEDED */

  flex: 0 0 7em;
  margin: 0 0.5em;
  display: flex;
  flex-flow: column;
  align-items: center;

  @media screen and (max-width: 1023px) {
    flex: 0 0 7em;
  }

  @media screen and (max-width: 425px) {
    flex: 0 0 7em;
  }

  :first-child {
    /* margin: 1em 1.5em 1em 0;
    align-items: center; */
  }
`;

const TextContainer = styled.div`
  margin: 0.5em 0;
`;

const CastImg = styled.img`
  border-radius: 15px;
  vertical-align: top;

  max-width: 100%;
  height: auto;

  :hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  margin: 0.5em 0;
`;

const CastText = styled(Text)`
  margin: 0.25em;
  text-align: center;
`;

const ActorText = styled(CastText)`
  margin-top: 0;
  color: grey;
`;

const Cast = ({ cast = [] }) => {
  const tempPersonURL = "https://image.tmdb.org/t/p/w500";

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const clamp = (value: num, clampAt: num = 30) => {
    if (value > 0) {
      return value > clampAt ? clampAt : value;
    } else {
      return value < -clampAt ? -clampAt : value;
    }
  };

  const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });

  return (
    <Wrapper>
      {/* <Heading>Cast</Heading> */}

      <ComposedScrollContainer>
        {cast.slice(0, 15).map(person => {
          return (
            <AnimatedCastCard key={person.id} style={{ ...style }}>
              <CastImg
                src={
                  person.profile_path
                    ? `${tempPersonURL}${person.profile_path}`
                    : AltPoster
                }
                alt={`Cast member: ${person.name}`}
              />
              <TextContainer>
                <CastText>{person.character}</CastText>
                <ActorText>{person.name}</ActorText>
              </TextContainer>
            </AnimatedCastCard>
          );
        })}
      </ComposedScrollContainer>
    </Wrapper>
  );
};

const mapsStateToProps = state => {
  return {
    cast: state.movie.credits.cast
  };
};

export default connect(mapsStateToProps)(Cast);
