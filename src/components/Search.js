import React, { useState } from "react";

const Search = props => {
  const [query, setQuery] = useState("");

  const handleSearchSubmit = event => {
    event.preventDefault();
    props.onSubmit(query);
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
