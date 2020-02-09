import React, { useState } from "react";
import styled from "styled-components";

import { fetchMovies } from "../../actions";
import { API_KEY } from "../../api/key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const StyledForm = styled.form`
  margin: 1.5em 1em;
`;

const StyledInput = styled.input`
  height: 2rem;
  width: 100px;
  transition: all 0.4s ease-in-out;
  background: #151c24;
  font-size: 20px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 2px solid black;
  border-radius: 40px;
  outline: none;
  color: white;
  font-family: inherit;
  margin: 0;

  :focus {
    width: 200px;
    border-color: #2769b4;
  }
`;

const StyledButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid black;
  margin: 0 0 0 0.5rem;
  background: #151c24;
  outline: none;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  color: white;

  :hover {
    cursor: pointer;
    transform: scale(1.15);
    background: #2769b4;
    color: black;
    border-radius: 10%;
  }
`;

const SearchIcon = styled(FontAwesomeIcon).attrs({ icon: faSearch })`
  color: white;
  font-size: 1em;
`;

// Passes query entered in Text Input into onSubmit, which takes in modified URL query as param and sends it to axiosFetch hook.
const Search = ({ fetchMovies }) => {
  const [query, setQuery] = useState("");

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&840`;

  return (
    <StyledForm
      onSubmit={event => {
        fetchMovies(url);
        event.preventDefault();
      }}
    >
      <StyledInput
        type="text"
        placeholder="Search..."
        name="search"
        autoComplete="off"
        onChange={event => setQuery(event.target.value)}
      />
      <StyledButton type="submit">
        <SearchIcon />
      </StyledButton>
    </StyledForm>
  );
};

export default connect(null, { fetchMovies })(Search);
