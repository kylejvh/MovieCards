import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import debounce from "lodash.debounce";

import { useScroll } from "react-use-gesture";
import { ArrowLeftCircle } from "styled-icons/remix-fill/ArrowLeftCircle";
import { ArrowRightCircle } from "styled-icons/remix-fill/ArrowRightCircle";

import styled from "styled-components";

const Heading = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
`;

const CastContainer = styled.div`
  display: flex;
  margin-bottom: 3em;
`;

const GridContainer = styled.div`
  /* Direct children will be containerized with a 20px gap on both ends, keeping content off the edges */
`;

const Wrapper = styled.div`
  display: flex;
`;

const LeftScroll = styled(ArrowLeftCircle)`
  width: 4em;
  margin-right: 2em;
  align-self: center;
  transition: all 300ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    color: rgb(185, 185, 185);
  }
`;

const RightScroll = styled(ArrowRightCircle)`
  width: 4em;
  margin-left: 2em;
  align-self: center;
  transition: all 300ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    color: rgb(185, 185, 185);
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 60vw;
  padding: 0;
  margin-left: ${props => (props.scrollArrow ? "6em" : "")};
  padding: 20px 0;
`;

const AnimatedCastCard = styled(animated.div)`
  margin: 1em 1.5em;
  display: flex;
  flex-flow: column;
  align-items: center;

  :first-child {
    margin: 1em 1.5em 1em 0;
    align-items: center;
  }
`;

const CastImg = styled.img`
  border-radius: 15px;

  :hover {
    cursor: pointer;
  }
  max-height: 10em;
  height: 6.5em;
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

const Cast = props => {
  const tempPersonURL = "https://image.tmdb.org/t/p/w500";
  const { cast } = props;
  const refContainer = useRef(null);

  const [overflowPresent, setOverflowPresent] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkForOverflow = () => {
    const { scrollWidth, clientWidth } = refContainer.current;
    const hasOverflow = scrollWidth > clientWidth;

    setOverflowPresent(hasOverflow);
    console.log("overflow checked", hasOverflow);
  };

  const checkForScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = refContainer.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
  };

  const debounceCheckForOverflow = debounce(checkForOverflow, 500);
  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 500);

  const renderControls = () => {};

  const scrollContainerBy = distance => {
    refContainer.current.scrollBy({ left: distance, behavior: "smooth" });
  };

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

  useEffect(() => {
    checkForOverflow();
    checkForScrollPosition();
    refContainer.current.addEventListener(
      "scroll",
      debounceCheckForScrollPosition
    );
  }, [canScrollLeft, canScrollRight]);

  return (
    <>
      <Heading>Cast</Heading>

      {cast ? (
        <>
          <Wrapper>
            {canScrollLeft && (
              <LeftScroll onClick={() => scrollContainerBy(-300)} />
            )}
            <HorizontalContainer
              ref={node => {
                refContainer.current = node;
              }}
              {...bind()}
              scrollArrow={!canScrollLeft}
            >
              {cast.slice(0, 15).map(person => {
                return (
                  <AnimatedCastCard key={person.id} style={{ ...style }}>
                    <CastImg
                      src={
                        person.profile_path
                          ? `${tempPersonURL}${person.profile_path}`
                          : null
                      }
                      alt={`Cast member: ${person.name}`}
                    />
                    <CastText>{person.character}</CastText>
                    <ActorText>{person.name}</ActorText>
                  </AnimatedCastCard>
                );
              })}
            </HorizontalContainer>
            {canScrollRight && (
              <RightScroll onClick={() => scrollContainerBy(300)} />
            )}
          </Wrapper>
        </>
      ) : null}
    </>
  );
};

export default Cast;
