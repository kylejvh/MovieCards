import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ArrowLeftCircle } from "styled-icons/remix-fill/ArrowLeftCircle";
import { ArrowRightCircle } from "styled-icons/remix-fill/ArrowRightCircle";
import history from "../history";

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
  justify-content: center;
  align-items: center;

  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.98);
`;

const Header = styled.div``;

const Content = styled.div``;

const ModalImage = styled.img`
  max-width: 70vw;
`;

const LeftScroll = styled(ArrowLeftCircle)`
  width: 4em;
  color: white;

  transition: all 300ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    color: rgb(185, 185, 185);
  }
`;

const RightScroll = styled(ArrowRightCircle)`
  width: 4em;

  color: white;

  transition: all 300ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    color: rgb(185, 185, 185);
  }
`;

const Controls = styled.div`
  display: flex;

  p {
    margin: 0 0.5em;

    color: white;
    font-size: 4em;
  }
`;

const ImageModal = ({ images, clickedImage, onDismiss }) => {
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

  const prevImage = (images, currentImg) => {
    return setModalImageSource(images[currentIndex - 1].file_path);
  };

  const nextImage = (images, currentImg) => {
    return setModalImageSource(images[currentIndex + 1].file_path);
  };

  useEffect(() => {
    checkIndexes();
  }, [modalImageSource, currentIndex]);

  return ReactDOM.createPortal(
    <ImageContainer onClick={onDismiss}>
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <Header>title///</Header>
        <Content>
          <ModalImage src={`${fullResURL}${modalImageSource}`} />
        </Content>
        <Controls>
          {controls.left && (
            <LeftScroll onClick={() => prevImage(images, modalImageSource)} />
          )}
          {controls.right && (
            <RightScroll onClick={() => nextImage(images, modalImageSource)} />
          )}
          <p>
            {currentIndex + 1} / {images.length}
          </p>
        </Controls>
      </div>
    </ImageContainer>,
    document.querySelector("#modal")
  );
};

export default ImageModal;
