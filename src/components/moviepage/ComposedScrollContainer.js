import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import debounce from "lodash.debounce";
import { useScroll } from "react-use-gesture";

import { ChevronsDown } from "styled-icons/boxicons-regular/ChevronsDown";

import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const HorizontalContainer = styled.div`
  display: flex;
  position: relative;

  overflow-x: hidden;


  width: calc(100% - 4em);
  margin: 0 4em;

  @media screen and (max-width: 801px) {
    width: calc(100% - 2.5em);
  margin: 0 2.5em;

  }

  /* margin-left: ${props => (props.scrollArrow ? "6em" : "")}; */
`;

const NewScrollButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 15;

  width: 4em;
  background: rgba(0, 0, 0, 0.25);
  border: 0;
  outline: 0;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 801px) {
    width: 2.5em;
  }
`;

const PrevIcon = styled(ChevronsDown)`
  transform: rotateZ(90deg);

  color: #fff;
  margin: 0 auto;

  transition: all 300ms ease;
`;

const NextIcon = styled(PrevIcon)`
  transform: rotateZ(-90deg);
`;

const ScrollLeft = styled(NewScrollButton)`
  left: 0;

  &:hover ${PrevIcon} {
    transform: scale(1.35) rotateZ(90deg);
  }
`;

const ScrollRight = styled(NewScrollButton)`
  right: 0;

  &:hover ${NextIcon} {
    transform: scale(1.35) rotateZ(-90deg);
  }
`;

const ComposedScrollContainer = ({ children, scrollDistance = 300 }) => {
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
    <Wrapper>
      {canScrollLeft && (
        <ScrollLeft onClick={() => scrollContainerBy(-scrollDistance)}>
          <PrevIcon />
        </ScrollLeft>
      )}

      {canScrollRight && (
        <ScrollRight onClick={() => scrollContainerBy(scrollDistance)}>
          <NextIcon />
        </ScrollRight>
      )}

      <HorizontalContainer
        ref={node => {
          refContainer.current = node;
        }}
        {...bind()}
      >
        {children}
      </HorizontalContainer>
    </Wrapper>
  );
};

export default ComposedScrollContainer;
