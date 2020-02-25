import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import ImageModal from "./ImageModal";
import ComposedScrollContainer from "../ComposedScrollContainer";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

//! Use scrollcontainer component...

const SpringContainer = styled(animated.div)`
  flex: 0 0 calc(25% - 1.5em);

  margin: 0 0.75em;

  @media screen and (max-width: 1279px) {
    flex: 0 0 calc(33.3333% - 1.5em);
  }

  @media screen and (max-width: 801px) {
    flex: 0 0 calc(40% - 1em);
    margin: 0 0.5em;
  }

  @media screen and (max-width: 500px) {
    flex: 0 0 calc(50% - 1em);
    margin: 0 0.5em;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  margin-bottom: 3em;
  height: 35%;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
  :hover {
    cursor: pointer;
  }

  /* padding: 0 0.75em; */
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

const Images = ({ backdrops = [], title = "" }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const thumbURL = "https://image.tmdb.org/t/p/w780";

  const [imageClick, setImageClick] = useState("");

  let modalScrollLock;

  const toggleScrollLock = bool => {
    return (modalScrollLock = bool);
  };

  const changeFocus = ref => {
    ref.focus();
  };

  const onModalOpen = filepath => {
    setImageClick(filepath);
    setModalIsOpen(true);

    toggleScrollLock(true);
  };

  const onModalClose = () => {
    setModalIsOpen(false);

    toggleScrollLock(false);
  };

  return (
    <Wrapper>
      {modalIsOpen && (
        <ImageModal
          changeFocus={changeFocus}
          images={backdrops}
          clickedImage={imageClick}
          onModalClose={onModalClose}
          title={title}
          ariaLabel="Image dialog with next and previous button."
        ></ImageModal>
      )}
      <BottomContainer>
        <ComposedScrollContainer scrollDistance="1200">
          {backdrops.slice(0, 20).map(image => {
            return (
              <SpringContainer key={image.file_path} style={{ ...style }}>
                <MovieImage
                  src={`${thumbURL}${image.file_path}`}
                  onClick={() => onModalOpen(image.file_path)}
                  alt="Movie Images"
                />
              </SpringContainer>
            );
          })}
        </ComposedScrollContainer>
      </BottomContainer>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    backdrops: state.movie.images.backdrops,
    posters: state.movie.images.posters,
    title: state.movie.movie.title
  };
};

export default connect(mapStateToProps)(Images);
