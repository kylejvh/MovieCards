import React from "react";

import "../style.css";

const MovieCard = props => {
  // !! Potential hover effect to be added later
  // const [isHovering, setIsHovering] = useState(false);

  const { poster_path, title, overview, vote_average, id } = props.movie;
  const { release_date, runtime, genres } = props.movie.details;

  const imageURL = `https://image.tmdb.org/t/p/original${poster_path}`;

  // !! const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // !! const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };

  return (
    <div className="card-container">
      <div className="poster-container">
        <div className="rating">
          <h2>
            <i className="fas fa-star"></i>
            {vote_average}
          </h2>
        </div>

        <div className="runtime">
          <h2>
            <i className="fas fa-stopwatch"></i>
            {runtime + " min"}
          </h2>
        </div>

        <img
          src={imageURL}
          onClick={() => props.handleMovieClick(id)}
          alt={`${title} poster`}
          // !! onMouseEnter={handleMouseEnter}
          // !! onMouseLeave={handleMouseLeave}
        ></img>
      </div>
      <div className="moviedata-container">
        <div>
          <h4>
            {release_date.substr(0, 4)}
            {genres.map(item => {
              return item.name + ", ";
            })}
          </h4>
          <h1>{title}</h1>
        </div>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
