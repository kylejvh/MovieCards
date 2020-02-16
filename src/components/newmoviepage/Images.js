import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import debounce from "lodash.debounce";

import { useScroll } from "react-use-gesture";
import { ArrowLeftCircle } from "styled-icons/remix-fill/ArrowLeftCircle";
import { ArrowRightCircle } from "styled-icons/remix-fill/ArrowRightCircle";

import ImageModal from "./ImageModal";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
  flex-flow: column wrap;
  overflow-x: scroll;
  width: 80vw;
  max-height: 45vh;
  padding: 1em 0;
  margin-bottom: 6em;
  margin-left: ${props => (props.scrollArrow ? "6em" : "")};
`;

const AnimatedCastCard = styled(animated.div)`
  max-width: 15em;
  margin: 1em;
`;

const CastImg = styled.img`
  :hover {
    cursor: pointer;
  }
  max-width: 12em;
`;

const Text = styled.p`
  margin: 0.5em 0;
`;

// const ScreenshotContainer = styled.div`
//   display: flex;
//   flex-flow: column;
//   align-items: flex-end;
//   flex: 1;
//   height: 100%;

//   /* background: linear-gradient(
//     90deg,
//     rgba(0, 0, 0, 0.9) 0%,
//     rgba(0, 0, 0, 0.5) 80%,
//     rgba(0, 0, 0, 0.2) 90%,
//     rgba(0, 0, 0, 0) 100%
//   ); */
// `;

// const ScreenshotGradient = styled.div`
//   height: auto;
//   max-height: 25%;
//   flex: 1;
//   width: 100%;
//   background: no-repeat center/contain url(${props => props.screenshotPath});
//   margin: 1em;
//   /* box-shadow: 0 0.1em 0.1em rgba(0, 0, 0, 0.034),
//     0 0.12em 0.22em rgba(0, 0, 0, 0.048), 0 0.5em 0.4em rgba(0, 0, 0, 0.06),
//     0 1em 0.75em rgba(0, 0, 0, 0.072), 0 0.5em 0.35em rgba(0, 0, 0, 0.086),
//     0 2.5em 2em rgba(0, 0, 0, 0.12); */

//   border-radius: 5px;
//   /* box-shadow: 10px 38px 19px rgba(255, 255, 255, 0.1); */
//   /* filter: blur(0.0001em); */
//   /* transition: all 300ms ease;
//   &:hover {
//     transform: scale(1.05);
//   } */
//   /* Write up animations with props to have each image ease in, one after the other. */
// `;

// const screenShotURL = "https://image.tmdb.org/t/p/w1280";

const Images = props => {
  const { backdrops, posters } = props.images;

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

  const thumbURL = "https://image.tmdb.org/t/p/w780";

  const [imageClick, setImageClick] = useState("");

  const onImageClick = filepath => {
    console.log(filepath);
    setImageClick(filepath);
  };

  let content;
  if (imageClick) {
    content = (
      <ImageModal
        images={backdrops}
        clickedImage={imageClick}
        onDismss={() => setImageClick(null)}
      ></ImageModal>
    );
  } else {
    content = null;
  }

  return (
    <>
      <Wrapper>
        {content}

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
          {props.children}
          {backdrops.map(image => {
            return (
              <AnimatedCastCard key={image.file_path} style={{ ...style }}>
                <CastImg
                  src={`${thumbURL}${image.file_path}`}
                  onClick={() => onImageClick(image.file_path)}
                  alt="Screenshots"
                />
              </AnimatedCastCard>
            );
          })}
        </HorizontalContainer>
        {canScrollRight && (
          <RightScroll onClick={() => scrollContainerBy(300)} />
        )}
      </Wrapper>
    </>
  );
};

export default Images;

/* <ScreenshotContainer>
{images.backdrops.slice(4, 8).map((image, i) => (
  <ScreenshotGradient
    key={i}
    screenshotPath={screenShotURL + image.file_path}
  ></ScreenshotGradient>
))}
</ScreenshotContainer> */
