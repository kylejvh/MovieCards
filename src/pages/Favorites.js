import React, { useState } from "react";
import styled from "styled-components";

import Navigation from "../components/Navigation/Navigation";
import FavoritesBar from "../components/Favorites/FavoritesBar";
import MovieCard from "../components/MovieCard/MovieCard";

import useFavoriteHook from "../components/Favorites/useFavorite";

const MovieContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const PageText = styled.h1`
  font-size: 1.5em;
  margin: 1.5em 1em 0 1em;
  color: #7ca579;
`;

const RemoveButton = styled.button`
  margin: 0.5em;
  padding: 0.5em;
  border: none;
  outline: none;
  border-radius: 0.8em;
  color: white;
  font: inherit;
  font-size: 1.1rem;
  justify-self: center;
  align-self: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  text-decoration: none;
  background: #2769b4;

  :hover {
    cursor: pointer;
    transform: scale(1.1);
    background: #008080;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1vw 1vw;
`;

const ConfirmButton = styled(RemoveButton)``;
const SelectAllButton = styled(RemoveButton)``;
const SelectNoneButton = styled(RemoveButton)``;

const Favorites = props => {
  const { favoritesData } = props;

  const [removeMode, setRemoveMode] = useState(false);
  // const [favoritesData, setFavoritesData] = useState(
  //   {
  //     list: [],
  //     checkedForRemoval: false,
  //     idsToDelete: []
  //   }

  //   // Make A list of movies to remove, or save indexes? look up how to delete functionally...
  // );

  const { handleMovieClick, addToDeleteList } = props;

  // const addFavorite = movie => {
  //   setFavoritesData({
  //     list: movie
  //   });
  // };

  const handleCheckboxChange = id => {
    console.log(id, "passed id up if checked");
    addToDeleteList(id);
  };

  const onFavClick = () => {
    setRemoveMode(prevState => !prevState);
  };

  // either handle state in mylist component,
  // or

  return (
    <>
      <Navigation />
      <PageText>Your list of favorites!</PageText>

      <ButtonContainer>
        removecontainer
        <RemoveButton onClick={onFavClick}>Remove Favorites</RemoveButton>
        {props.removeMode && <p>Select movies to remove.</p>}
        <SelectAllButton>Select All</SelectAllButton>
        <SelectNoneButton>Select None</SelectNoneButton>
        <ConfirmButton>Confirm Remove?</ConfirmButton>
      </ButtonContainer>

      <MovieContainer>
        {favoritesData.list.map(movie => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              handleMovieClick={handleMovieClick}
              removeMode={removeMode}
              handleCheckboxChange={handleCheckboxChange}
            />
          );
        })}
      </MovieContainer>

      {/* {isError && <div>An error occured, please try again.</div>}
      {isLoading ? (
        <Loader />
      ) : (
        <MovieContainer>
          {data.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleMovieClick={handleMovieClick}
              />
            );
          })}
        </MovieContainer>
      )} */}
    </>
  );
};

export default Favorites;
