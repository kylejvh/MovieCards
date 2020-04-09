import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { fetchMovies, handleSearchSubmit } from "../../actions";
import { TMDB_API_KEY } from "../../apis/tmdb/key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";

const StyledForm = styled.form`
  margin: ${(props) => (props.inlineForm ? "-.25em 1.15em 0 1.15em" : "0 1em")};
  height: 0.9em;
`;

const StyledInput = styled.input`
  width: ${(props) => (props.inlineForm ? "4.5em" : "20em")};
  height: ${(props) => (props.inlineForm ? "" : "2em")};
  transition: all 0.4s ease-in-out;
  background: #151c24;
  padding: 0.25em 0.75em;
  border: 2px solid black;
  border-radius: 1.5em;
  outline: none;
  color: white;
  font-family: inherit;
  margin: 0;

  :focus {
    border-color: #2769b4;
  }

  ::placeholder {
    font-size: 0.85em;
    color: rgb(225, 225, 225);
  }

  @media screen and (max-width: 900px) {
    width: ${(props) => (props.inlineForm ? "3em" : "40vw")};
    height: ${(props) => (props.inlineForm ? "" : "1.5em")};
  }

  @media screen and (max-width: 480px) {
    width: ${(props) => (props.inlineForm ? "3em" : "40vw")};
    height: ${(props) => (props.inlineForm ? "" : "1.5em")};
  }
`;

const StyledButton = styled.button`
  width: ${(props) => (props.inlineForm ? "1.8em" : "2.75em")};
  height: ${(props) => (props.inlineForm ? "1.8em" : "2.75em")};
  border-radius: 50%;
  border: 2px solid black;
  margin: 0 0 0 0.25em;
  background: #151c24;
  outline: none;

  transition: all 300ms ease-in-out;
  color: white;

  :hover {
    cursor: pointer;
    transform: scale(1.1);
    background: #2769b4;
    color: black;
    border-radius: 10%;
  }
`;

const SearchIcon = styled(FontAwesomeIcon).attrs({ icon: faSearch })`
  color: white;
  text-align: center;
  font-size: 0.85em;
`;

// Passes query entered in Text Input into onSubmit, which takes in modified URL query as param and sends it to axiosFetch hook.
const Search = ({ inline, fetchMovies, submittedQuery }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const history = useHistory();

  //! send a message along to prompt user to input something...
  const handleSearchSubmit = (event, url, query, inline) => {
    event.preventDefault();

    if (inline) {
      // Handle submitting from inline form.
      // Pass along search query to be used after redirect and redirect to searchpage.
      fetchMovies(url, query);
      return history.push("/search");
    } else {
      // Handle submitting when user is on search page...
      return fetchMovies(url);
    }
  };

  useEffect(() => {
    // Pass along submitted query on redirect.
    if (submittedQuery && location.pathname === "/search") {
      setQuery(submittedQuery);
    }
  }, [submittedQuery, location]);

  const url = `/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&840`;

  return (
    <StyledForm
      inlineForm={inline}
      onSubmit={(e) => handleSearchSubmit(e, url, query, inline)}
    >
      <StyledInput
        type="text"
        placeholder="Search"
        name="search"
        autoComplete="off"
        inlineForm={inline}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {console.log(inline)}
      <StyledButton type="submit" inlineForm={inline}>
        <SearchIcon />
      </StyledButton>
    </StyledForm>
  );
};

const mapStateToProps = (state) => {
  return {
    submittedQuery: state.movies.submittedQuery,
  };
};

export default connect(mapStateToProps, { fetchMovies })(Search);
