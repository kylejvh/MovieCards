import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./fullmoviepage.css";

const FullMoviePage = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const { movie } = props.clickedMovieState;
  const { isLoading } = props;

  const [castData, setCastData] = useState({
    cast: [],
    castIsLoading: true
  });

  useEffect(() => {
    async function fetchCast() {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
      );
      result.data.cast.splice(4);
      setCastData({
        cast: result.data.cast,
        castIsLoading: false
      });
    }
    fetchCast();
  }, [API_KEY, movie.id]);

  const posterURL = "https://image.tmdb.org/t/p/original/";

  const tempPersonURL = "https://image.tmdb.org/t/p/w500";

  // Styles for Cast info
  const divCastStyling = {
    margin: "0 .25em 0em .25em",
    display: "flex",
    flexFlow: "column"
  };
  const imgCastStyling = {
    alignSelf: "center",
    borderRadius: "50%",
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.27)",
    height: "auto",
    width: "3em"
  };
  const pCastStyling = {
    fontSize: ".7em",
    margin: ".25em",
    padding: 0,
    textAlign: "center"
  };
  const pCastStyling2 = {
    fontSize: ".7em",
    margin: 0,
    padding: 0,
    textAlign: "center",
    color: "grey"
  };

  // calculate runtime in hours?
  // const calcRuntime = (num) => {
  //   if (num % 60 == 0) {
  //     return num / 60;
  //   } else {
  //     num / 60
  //   }
  // }

  // you should get actor data on this page...

  return (
    <div className="container">
      {isLoading ? (
        "Loading Placeholder"
      ) : (
        <div>
          <div>
            <img
              className="top-image"
              src={posterURL + movie.backdrop_path}
              alt={`${movie.title} + " backdrop"`}
            />
            <h1 className="title-text">{movie.title}</h1>
            <Link to="/">Temp Back Link</Link>
          </div>
          <div className="info-container">
            <h3>"{movie.details.tagline}"</h3>

            <div className="cast-container">
              {castData.cast.map(person => {
                return (
                  <div style={divCastStyling}>
                    <img
                      style={imgCastStyling}
                      src={tempPersonURL + person.profile_path}
                      alt={`Cast member: ${person.name}`}
                    />
                    <p style={pCastStyling}>{person.character}</p>
                    <p style={pCastStyling2}>{person.name}</p>
                  </div>
                );
              })}
            </div>
            <p>
              Plot: <br /> {movie.overview}
            </p>
            <div className="footer-details">
              <p>
                Release Date: <br />
                {movie.release_date}
              </p>
              <p>
                Budget:
                <br /> {"$ " + movie.details.budget.toLocaleString()}
              </p>
              <a href={`https://www.imdb.com/title/${movie.details.imdb_id}`}>
                <i className="fab fa-imdb fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullMoviePage;
