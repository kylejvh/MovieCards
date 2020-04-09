import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ArrowLeftCircle } from "styled-icons/remix-fill/ArrowLeftCircle";
import { ArrowRightCircle } from "styled-icons/remix-fill/ArrowRightCircle";
import { WindowClose } from "styled-icons/fa-regular/WindowClose";
import history from "../../history";

// Reuseable Modal Component, optionally Uses SemanticUI for styling and React Router History to navigate out.

// Uses React Portals, requires div with id root on index.html
// Takes in Props of title, content, actions, and onDismiss. EX:
{
  /*    <Modal
        title="Delete Stream"
        content="Are you sure you want to delete this stream?"
        actions={actions}
        onDismiss={() => history.push("/")}
      /> */
}

// Actions variable defined in parent, shows buttons on modal
// const actions = (
//   <div>
//     <button className="ui button">Cancel</button>
//     <button className="ui button negative">Delete</button>
//   </div>
// );

// Uses history to promagatically navigate away from modal when user clicks off of modal

const ImageContainer = styled.div`
  display: flex;

  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.98);
  color: white;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
`;

const Content = styled.div`
  margin: auto;
  position: relative;
`;

const ModalImage = styled.img`
  width: 70vw;

  @media screen and (max-width: 1441px) {
    width: 85vw;
  }

  @media screen and (max-width: 376px) {
    width: 90vw;
  }
`;

const ScrollButton = styled.button`
  width: 3rem;

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

const CloseButton = styled(ScrollButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Controls = styled.div`
  display: flex;
`;

const ProgressText = styled(Heading)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.25rem;
`;

const ImageModal = ({
  images,
  clickedImage,
  onModalClose,
  title,
  ariaLabel,
  role = "dialog"
}) => {
  const fullResURL = "https://image.tmdb.org/t/p/original";

  const [modalImageSource, setModalImageSource] = useState(clickedImage);
  const [controls, setControls] = useState({ left: true, right: true });

  let currentIndex = images.findIndex(
    item => item.file_path === modalImageSource
  );

  const checkIndexes = () => {
    setControls({
      left: currentIndex - 1 >= 0,
      right: currentIndex + 1 < images.length
    });
  };

  const prevImage = images =>
    setModalImageSource(images[currentIndex - 1].file_path);

  const nextImage = images =>
    setModalImageSource(images[currentIndex + 1].file_path);

  const onKeyDown = ({ keyCode }) => keyCode === 27 && onModalClose();

  const buttonRef = useRef(null);

  useEffect(() => {
    checkIndexes();

    // Changes focus to Modal's Close Button.
    if (buttonRef) {
      buttonRef.current.focus();
    }
  }, [modalImageSource, currentIndex, buttonRef]);

  return ReactDOM.createPortal(
    <ImageContainer
      onClick={onModalClose}
      aria-modal="true"
      tabIndex="-1"
      role={role}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      <Content onClick={e => e.stopPropagation()}>
        <Heading>{title}</Heading>
        <ModalImage src={`${fullResURL}${modalImageSource}`} />
        <CloseButton
          as="button"
          onClick={onModalClose}
          aria-label="Close Modal"
          ref={node => (buttonRef.current = node)}
        >
          <WindowClose />
        </CloseButton>
        <Controls>
          {controls.left && (
            <ScrollButton onClick={() => prevImage(images)}>
              <ArrowLeftCircle />
            </ScrollButton>
          )}
          {controls.right && (
            <ScrollButton onClick={() => nextImage(images)}>
              <ArrowRightCircle />
            </ScrollButton>
          )}
          <ProgressText>
            {currentIndex + 1} / {images.length}
          </ProgressText>
        </Controls>
      </Content>
    </ImageContainer>,

    document.body
  );
};

export default ImageModal;
