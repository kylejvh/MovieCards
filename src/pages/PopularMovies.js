// import React from "react";
// import {} from "react-router-dom";

// import axios from "axios";
// import MovieCard from "../components/MovieCard";

// const PopularMovies = props => {
//   const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

//   const getRequest = async () => {
//     searchRequest();
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
//     );

//     await Promise.all(
//       response.data.results.map(async movie => {
//         movie.details = await getDetails(movie.id);
//       })
//     );
//     // !! add error handling...

//     // Call function passed in as props to lift results up to state in App.js
//     return searchComplete(response.data.results);
//   };
//   return (
//     <div>
//       <h1>Popular</h1>
//     </div>
//   );
// };

// export default PopularMovies;

// // /discover/movie?sort_by=popularity.desc

// // in this component you need to:
// // call the above endpoint to gather data
// // show popular movies using moviecards as laid out in other page

// // map over movies once data is gathered, and display as on other page.

// // how would you use the reducer set up to send it your resutsl?//
