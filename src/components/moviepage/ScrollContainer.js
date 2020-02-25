import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import debounce from "lodash.debounce";

import { useScroll } from "react-use-gesture";
import { ArrowLeftCircle } from "styled-icons/remix-fill/ArrowLeftCircle";
import { ArrowRightCircle } from "styled-icons/remix-fill/ArrowRightCircle";

import { ChevronsDown } from "styled-icons/boxicons-regular/ChevronsDown";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: auto 0 2em 0;
  position: relative;
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

const HorizontalContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  
  /* margin-left: ${props => (props.scrollArrow ? "6em" : "")}; */
  padding: 20px 0;

`;

const ScrollButton = styled.button`
  width: 4em;
  color: white;
  background: none;
  outline: none;
  border: none;
  transition: all 200ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    color: rgb(185, 185, 185);
  }
`;

const NewScrollButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  ${props => props.direction === "left" && "left: 0"}

  ${props => props.direction === "right" && "right: 0"}

  width: 2.5em;
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  outline: 0;
  padding: 0;
  margin: 1em 0;
  z-index: 4;

  :hover {
    cursor: pointer;
  }
  /* 
  span {
    width: 25px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }

  &--next {
    right: 0;

    span {
      transform: rotateZ(-90deg);
    }
  }

  &--prev {
    left: 0;

    span {
      transform: rotateZ(90deg);
    }
  }
} */
`;

const PrevIcon = styled(ChevronsDown)`
  transform: rotateZ(90deg);
  left: 0;
  color: #fff;
  display: block;
  margin: 0 auto;
`;

const NextIcon = styled(PrevIcon)`
  transform: rotateZ(-90deg);
  left: 0;
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

const ScrollContainer = ({ children, scrollDistance = 300 }) => {
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

  const debounceCheckForOverflow = debounce(checkForOverflow, 1000);
  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 500);

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
      <>
        <Wrapper>
          {canScrollLeft && (
            <NewScrollButton
              direction="left"
              onClick={() => scrollContainerBy(-scrollDistance)}
            >
              <PrevIcon />
            </NewScrollButton>
          )}

          <HorizontalContainer
            ref={node => {
              refContainer.current = node;
            }}
            {...bind()}
            scrollArrow={!canScrollLeft}
          >
            {children}
          </HorizontalContainer>

          {canScrollRight && (
            <NewScrollButton
              direction="right"
              onClick={() => scrollContainerBy(scrollDistance)}
            >
              <NextIcon />
            </NewScrollButton>
          )}
        </Wrapper>
      </>
    </>
  );
};

export default ScrollContainer;
