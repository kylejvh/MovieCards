import React from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";

import { useScroll } from "react-use-gesture";

import ComposedScrollContainer from "../ComposedScrollContainer";
import styled from "styled-components";

import AltPoster from "../../movielist/posterplaceholder.jpg";

const Wrapper = styled.div`
  margin: auto 0 3.5rem 0;
  max-width: 65%;

  @media screen and (max-width: 1023px) {
    max-width: 100%;
    margin-bottom: 2em;
    margin-top: 1em;
  }
`;

const AnimatedCastCard = styled(animated.div)`
  /* NEEDED */

  flex: 0 0 7rem;
  margin: 0 0.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;

  /* @media screen and (max-width: 1023px) {
    flex: 0 0 7em;
  }

  @media screen and (max-width: 425px) {
    flex: 0 0 7em;
  } */

  :first-child {
    /* margin: 1em 1.5em 1em 0;
    align-items: center; */
  }
`;

const TextContainer = styled.div`
  margin: 0.5rem 0;
`;

const CastImg = styled.img`
  border-radius: 0.94rem;
  vertical-align: top;

  max-width: 100%;
  height: auto;

  :hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  margin: 0.5rem 0;
`;

const CastText = styled(Text)`
  margin: 0.25rem;
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
