import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Trailer from "../components/Trailer";

import { Link } from "react-router-dom";
import axios from "axios";

import useAxiosHook from "../components/DataFetch/useAxiosHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import AddFavoriteButton from "../components/Favorites/AddFavoriteButton";
import Cast from "../components/Cast";
import ExpandButton from "../components/ExpandButton";

const posterURL = "https://image.tmdb.org/t/p/original/";

const MasterContainer = styled.div`
  background: linear-gradient(360deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)),
    url(${props => posterURL + props.posterPath});
  background-size: cover;
  height: 100vh;
  /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75); */
  font-size: 24px;
  color: white;
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(360deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)); */
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 80%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  /* background: linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)); */
  padding: 1em 2.5em 0 2.5em;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 40em;
  /* background: linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)); */
  padding: 0.5em 1em;
`;

const CastContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailContainer = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
`;

const MovieTitle = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 3rem;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
`;

const DetailTitle = styled(MovieTitle)`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const Poster = styled.img`
  width: 15em;
  box-shadow: 10px 10px 38px 19px rgba(255, 255, 255, 0.1);
  filter: blur(0.0001em);
`;

const Text = styled.p`
  font-size: 0.75em;
  margin: 0 0 1rem 0;
`;

const MoviePlot = styled(Text)`
  font-size: 0.75em;
`;

const PlayButton = styled.button`
  margin: 0;
  border-radius: 15px;
  background-color: red;
  color: white;
  font: inherit;
  order: 1;
  justify-self: center;
  align-self: center;
`;

const FavoritesButton = styled.button`
  margin: 0;
  border-radius: 15px;
  background-color: red;
  color: white;
  font: inherit;
  order: 1;
  justify-self: center;
  align-self: center;
`;

const MovieTagline = styled.h3`
  font-size: 1.05em;
  font-family: "Titillium Web", sans-serif;
  margin-top: 0.25em;
  width: 14em;
`;

const DownArrow = styled(FontAwesomeIcon).attrs({ icon: faChevronDown })`
  align-self: center;
  font-size: 2em;
`;

const FullMoviePage = props => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const { movie } = props.clickedMovieState;
  const { handleFavorites } = props;

  // Over a certain width, take the top hero image and render it as the background image, overlaying all other components.
  const isMobile = window.innerWidth > 800;

  // !! Styled Components Code
  // ? Can I put an if statement below and adapt it dynamically, or do I need state/props?

  //css
  const bodyStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${posterURL +
      movie.backdrop_path})`,
    backgroundSize: "cover",
    height: "100vh",
    boxShadow: "inset 1px 0px 3em 0px rgba(0,0,0,0.75)",
    WebkitBoxShadow: "inset 0px 0px 84px 0px rgba(0,0,0,0.75)",
    MozBoxShadow: "inset 1px 0px 84px 0px rgba(0,0,0,0.75)"
  };

  const [creditsData, setCreditsData] = useState({
    cast: [],
    crew: {},
    castIsLoading: true,
    castToggle: false,
    crewToggle: false
  });

  useEffect(() => {
    let cast = [];
    let crew = {};
    async function fetchCredits() {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
      );
      // cast = result.data.cast;
      // console.log(result, "cast");
      // cast.splice(4);

      // crew.director = result.data.crew.find(
      //   person => person.job === "Director"
      // );
      // console.log(crewArr.director, "director found?");
      // crewArr.writers = result.data.crew.filter(
      //   person => person.department === "Writing"
      // );
      // crewArr.composer = result.data.crew.find(
      //   person => person.job === "Original Music Composer"
      // );
      // console.log(crewArr.composer, "composer found?");
      cast = result.data.cast;
      cast.splice(4);
      crew.director = result.data.crew.find(
        person => person.job === "Director"
      );
      crew.writers = result.data.crew.filter(
        person => person.job === "Screenplay" || person.job === "Writer"
      );
      crew.composer = result.data.crew.find(
        person => person.job === "Original Music Composer"
      );
      // console.log(result.data.crew);
      setCreditsData({
        cast: cast,
        crew: crew,
        castIsLoading: false
      });
    }
    fetchCredits();
  }, [API_KEY, movie.id]);

  const tempPersonURL = "https://image.tmdb.org/t/p/w500";

  // you should get actor data on this page...

  return (
    // Desktop version

    <MasterContainer posterPath={movie.backdrop_path}>
      {console.log(movie)}
      <LeftContainer>
        <Poster src={posterURL + movie.poster_path}></Poster>
        {movie.details.tagline && (
          <MovieTagline>{movie.details.tagline}.</MovieTagline>
        )}

        <a href={`https://www.imdb.com/title/${movie.details.imdb_id}`}>
          {/* <i className="fab fa-imdb fa-2x"></i> */}
        </a>
        <Trailer urlKey={movie.details.videos.results[0].key} />
        <FavoritesButton onClick={() => props.onAddFavorite(movie)}>
          Add to Favorites
        </FavoritesButton>
        <Link to="/">Temp Back Link</Link>
        {/* Above, only the release date, rating (IMDB), and IMDB Link */}
      </LeftContainer>
      <CenterContainer>
        <MovieTitle>{movie.title}</MovieTitle>
        <Text>
          {movie.details.genres
            .map(item => {
              let arr = [];
              arr.push(item.name);
              return arr;
            })
            .join(", ")}
        </Text>
        <MoviePlot>{movie.overview}</MoviePlot>
        {/* <CastContainer>
           !! Make A button  
          <Cast style={{ flexDirection: "row" }} cast={creditsData.cast} /> 
          <ExpandButton
            buttonTitle="Cast"
            onClick={() =>
              setCreditsData(prevState => ({
                ...prevState,
                castToggle: !prevState.castToggle
              }))
            }
          /> 
          {creditsData.castToggle && castData} 
        </CastContainer> */}
        <BottomContainer>
          <DetailContainer>
            <DetailTitle>Director:</DetailTitle>
            {creditsData.crew.director && (
              <Text>{creditsData.crew.director.name}</Text>
            )}
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>Composer:</DetailTitle>
            {creditsData.crew.composer && (
              <Text>{creditsData.crew.composer.name}</Text>
            )}
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>Screenplay:</DetailTitle>
            {creditsData.crew.writers && (
              <Text>
                {creditsData.crew.writers.map(person => person.name).join(", ")}
              </Text>
            )}
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>Budget:</DetailTitle>
            {movie.details.budget === 0 ? (
              <Text>Not Available</Text>
            ) : (
              <Text> {"$ " + movie.details.budget.toLocaleString()}</Text>
            )}
          </DetailContainer>
          <DetailContainer>
            <DetailTitle>Release Date:</DetailTitle>
            <Text>{movie.release_date}</Text>
          </DetailContainer>
        </BottomContainer>
        <DownArrow></DownArrow>
      </CenterContainer>
    </MasterContainer>
  );
};

// mobile??
//     <div className="container">
//       <DesktopBackground>
//         {isLoading ? (
//           "Loading Placeholder"
//         ) : (
//           <div>
//             <div>
//               {/* <img
//               className="top-image"
//               src={posterURL + movie.backdrop_path}
//               alt={`${movie.title} + " backdrop"`}
//             /> */}
//               <h1 className="title-text">{movie.title}</h1>
//               <Link to="/">Temp Back Link</Link>
//             </div>
//             <div className="info-container">
//               <h3>"{movie.details.tagline}"</h3>

//               <div className="cast-container">
//                 <ExpandButton
//                   buttonTitle="Cast"
//                   onClick={() =>
//                     setCreditsData(prevState => ({
//                       ...prevState,
//                       castToggle: !prevState.castToggle
//                     }))
//                   }
//                 />
//                 {creditsData.castToggle && castData}
//               </div>
//               <p>
//                 Plot: <br /> {movie.overview}
//               </p>
//               <div className="footer-details">
//                 {/* <ExpandButton
//                 buttonTitle="Director"
//                 onClick={() => {
//                   return (
//                     <div>
//                       {creditsData.crew.name}
//                       <img
//                         src={tempPersonURL + creditsData.crew.profile_path}
//                       ></img>
//                     </div>
//                   );
//                 }}
//               /> */}
//                 <p>
//                   Release Date: <br />
//                   {movie.release_date}
//                 </p>
//                 <p>
//                   Budget:
//                   <br /> {"$ " + movie.details.budget.toLocaleString()}
//                 </p>
//                 <a href={`https://www.imdb.com/title/${movie.details.imdb_id}`}>
//                   <i className="fab fa-imdb fa-2x"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </DesktopBackground>
//     </div>
//   );
// };

export default FullMoviePage;
