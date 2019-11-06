// import React, { useEffect } from "react";

// const HandleClick = (props, id) /* needed? */ => {
//   useEffect(() => {
//     const clickedMovie = movies.find(movie => movie.id === id);
//     setClickedMovieState({
//       movie: clickedMovie,
//       isClicked: true // needed?
//     });
//   });
//   return <div></div>;
// };

// export default HandleClick;

/* The Problem: I need to be able to execute the above code before/on render. How to do this with hooks/best way to do this?
  Real problem is that refreshing dev server causes undefined. On render, the app is not saving what it needs to. 
  Can useeffect help?


  solution seems to be react suspense... 
  use it just like you would isLoading...
  show a loading screen when content is not ready...
*/
