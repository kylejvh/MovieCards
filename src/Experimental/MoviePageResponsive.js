// import React, { useState, useEffect, useContext } from "react";
// import styled from "styled-components";
// import { Tab } from "semantic-ui-react";
// // import {  //! React Scroll, not implemented.
// //   Link,
// //   Element,
// //   Events,
// //   animateScroll as scroll,
// //   scrollSpy,
// //   scroller
// // } from "react-scroll";

// import { useMediaQuery } from "react-responsive";

// import Trailer from "../components/Trailer";

// import axios from "axios";

// import { CTX } from "../components/Store/Store";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// import AddFavoriteButton from "../components/Favorites/AddFavoriteButton";
// import Cast from "../components/Cast";

// import ExpandButton from "../components/ExpandButton";

// const AnotherDiv = styled.div`
//   display: block;
//   height: "5000px";
//   justify-content: "center";
// `;

// //! Mobile Styled Components

// const MobileContainer = styled.div`
//   background: linear-gradient(360deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)),
//     no-repeat center center fixed url(${props => props.posterPath});
//   background-size: cover;
//   height: 100vh;
//   width: 100vw;
//   /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
//   font-size: 24px;
//   color: white;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   flex-flow: column;
// `;

// const MobileTabs = styled.div`
//   position: fixed;
//   bottom: 0;
//   width: 100vw;
// `;

// const MobileDetails = styled.div``;

// const BackButton = styled.button`
//   margin: 0.5em;
//   padding: 0.5em;
//   border: none;
//   outline: none;
//   border-radius: 0.8em;
//   color: white;
//   font: inherit;
//   font-size: 1.1rem;
//   justify-self: center;
//   align-self: center;
//   transition: background 250ms ease-in-out, transform 150ms ease;
//   text-decoration: none;
//   background: #2769b4;

//   :hover {
//     cursor: pointer;
//     transform: scale(1.1);
//     background: #008080;
//   }
// `;

// const BackIcon = styled(faChevronLeft)`
//   color: white;
//   width: 1.1em;
//   height: 1.1em;
//   margin: 0em 0.35em;
// `;

// //! Desktop Styled Components

// const MasterContainer = styled.div`
//   background: linear-gradient(360deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)),
//     url(${props => props.posterPath});
//   background-size: cover;
//   /* box-shadow: inset 0px 0px 3em 0px rgba(0, 0, 0, 0.75);  */
//   font-size: 24px;
//   color: white;
//   display: flex;
//   background-color: #2c3949;
// `;

// const LeftContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* background: linear-gradient(360deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0)); */
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   background: linear-gradient(
//     90deg,
//     rgba(0, 0, 0, 0.9) 0%,
//     rgba(0, 0, 0, 0.5) 80%,
//     rgba(0, 0, 0, 0.2) 90%,
//     rgba(0, 0, 0, 0) 100%
//   );
//   /* background: linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)); */
//   padding: 1em 2.5em 0 2.5em;
// `;

// const CenterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-self: flex-end;
//   width: 40em;
//   /* background: linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)); */
//   padding: 0.5em 1em;
// `;

// const CastContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const BottomContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const DetailContainer = styled.div`
//   display: flex;
//   margin: 1rem;
//   flex-direction: column;
// `;

// const MovieTitle = styled.h1`
//   font-family: "Titillium Web", sans-serif;
//   font-size: 3rem;
//   text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
//     4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
//   margin: 0;
//   padding: 0;
// `;

// const DetailTitle = styled(MovieTitle)`
//   font-size: 1rem;
//   font-weight: 600;
//   text-align: center;
// `;

// const Poster = styled.img`
//   width: 15em;
//   box-shadow: 10px 10px 38px 19px rgba(255, 255, 255, 0.1);
//   filter: blur(0.0001em);
// `;

// const Text = styled.p`
//   font-size: 0.75em;
//   margin: 0 0 1rem 0;
// `;

// const MoviePlot = styled(Text)`
//   font-size: 0.75em;
// `;

// const PlayButton = styled.button`
//   margin: 0;
//   border-radius: 15px;
//   background-color: red;
//   color: white;
//   font: inherit;
//   order: 1;
//   justify-self: center;
//   align-self: center;
// `;

// const FavoritesButton = styled.button`
//   margin: 0;
//   border-radius: 15px;
//   background-color: red;
//   color: white;
//   font: inherit;
//   order: 1;
//   justify-self: center;
//   align-self: center;
// `;

// const TaglineText = styled.h3`
//   font: italic 600 1em "Titillium Web", sans-serif;
//   margin-top: 0.25em;
//   width: 14em;
// `;

// const DownArrow = styled(FontAwesomeIcon).attrs({ icon: faChevronDown })`
//   align-self: center;
//   font-size: 2em;
// `;

// const FullMoviePage = () => {
//   const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
//   const { state, dispatch } = useContext(CTX);
//   const { clickedMovie: movie } = state;
//   const posterURL = "https://image.tmdb.org/t/p/original/";
//   // const {  } = props.clickedMovieState;

//   // Over a certain width, take the top hero image and render it as the background image, overlaying all other components.
//   const isMobile = window.innerWidth > 800;

//   // semantic ui code...
//   const panes = [
//     {
//       menuItem: "Tab 1",
//       render: () => <Tab.Pane attached="top">This is a general tab...</Tab.Pane>
//     },
//     {
//       menuItem: "Plot",
//       render: () => (
//         <Tab.Pane attached="top">
//           <MoviePlot>{movie.overview}</MoviePlot>
//           <DetailTitle>Director:</DetailTitle>
//         </Tab.Pane>
//       )
//     },
//     {
//       menuItem: "Tab 3",
//       render: () => <Tab.Pane attached="top">This is another tab...</Tab.Pane>
//     }
//   ];

//   //! Temp state...
//   const [activeIndex, setActiveIndex] = useState(1);

//   const handleRangeChange = e =>
//     setActiveIndex({ activeIndex: e.target.value });
//   const handleTabChange = (e, { activeIndex }) =>
//     setActiveIndex({ activeIndex });

//   // !! Styled Components Code
//   // ? Can I put an if statement below and adapt it dynamically, or do I need state/props?

//   //css

//   // const [creditsData, setCreditsData] = useState({
//   //   cast: [],
//   //   crew: {},
//   //   castIsLoading: true,
//   //   castToggle: false,
//   //   crewToggle: false
//   // });

//   // useEffect(() => {
//   //   let cast = [];
//   //   let crew = {};
//   //   async function fetchCredits() {
//   //     const result = await axios.get(
//   //       `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
//   //     );
//   //     // cast = result.data.cast;
//   //     // console.log(result, "cast");
//   //     // cast.splice(4);

//   //     // crew.director = result.data.crew.find(
//   //     //   person => person.job === "Director"
//   //     // );
//   //     // console.log(crewArr.director, "director found?");
//   //     // crewArr.writers = result.data.crew.filter(
//   //     //   person => person.department === "Writing"
//   //     // );
//   //     // crewArr.composer = result.data.crew.find(
//   //     //   person => person.job === "Original Music Composer"
//   //     // );
//   //     // console.log(crewArr.composer, "composer found?");
//   //     cast = result.data.cast;
//   //     cast.splice(4);
//   //     crew.director = result.data.crew.find(
//   //       person => person.job === "Director"
//   //     );
//   //     crew.writers = result.data.crew.filter(
//   //       person => person.job === "Screenplay" || person.job === "Writer"
//   //     );
//   //     crew.composer = result.data.crew.find(
//   //       person => person.job === "Original Music Composer"
//   //     );
//   //     // console.log(result.data.crew);
//   //     setCreditsData({
//   //       cast: cast,
//   //       crew: crew,
//   //       castIsLoading: false
//   //     });
//   //   }
//   //   fetchCredits();
//   // }, [API_KEY, movie.id]);

//   // const tempPersonURL = "https://image.tmdb.org/t/p/w500";

//   // you should get actor data on this page...

//   const handleAddFavorite = () => {
//     let newArray = state.favorites.slice(); // copy prev fav list
//     if (newArray.length === 0) {
//       console.log("empty, added!");
//       newArray.splice(-1, 0, movie);
//       return dispatch({ type: "ADD_FAVORITE", payload: newArray });
//     } else if (state.favorites.map(item => item.id === movie.id)) {
//       return console.log("rejected match");
//     } else {
//       console.log("non-empty, no match, added!", movie.id);
//       newArray.splice(-1, 0, movie);
//       return dispatch({ type: "ADD_FAVORITE", payload: newArray });
//     }
//   };

//   // const scrollToBottomOnClick = () => { //! React Scroll, not implemented
//   // };

// //! Swipeable tab implementation...
//   return (
//     {isTabletOrMobile && (
//       <>
//         <AppBar
//           position="fixed"
//           color="default"
//           style={{ top: "auto", bottom: 0 }}
//         >
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             variant="fullWidth"
//             aria-label="full width tabs example"
//           >
//             <Tab
//               //icon={<PhoneIcon />}
//               label="Main"

//               // {...a11yProps(0) }
//             />
//             <Tab
//               //icon={<PhoneIcon />}
//               label="Plot"
//               // {...a11yProps(1) }
//             />
//             {/* <Tab    //! Reserved For Cast & Crew Implementation
//               //icon={<PhoneIcon />}
//               label="Cast & Crew"
//               //  {...a11yProps(2) } /
//             /> */}
//           </Tabs>
//         </AppBar>

//         <SwipeableViews
//           axis={"x"}
//           index={value}
//           onChangeIndex={handleChangeIndex}
//         >
//           {/* <TabPanel }> */}
//           {/* <MobileContainer posterPath={posterURL + movie.backdrop_path}> */}
//           <MobileContainer
//             value={value}
//             index={0}
//             posterPath={posterURL + movie.poster_path}
//           >
//             <BackButton onClick={() => navigate("../")}>
//               <BackIcon />
//             </BackButton>
//             <MobileDetails>
//               <MobileTitle>{movie.title}</MobileTitle>

//               {movie.details.tagline && (
//                 <MobileTaglineText>
//                   "{movie.details.tagline}"
//                 </MobileTaglineText>
//               )}
//               <ChipContainer>
//                 {genresArray.map((item, index) => (
//                   <Pill
//                     color="primary"
//                     size="small"
//                     key={index}
//                     label={item}
//                   ></Pill>
//                 ))}
//               </ChipContainer>
//               <SubTextContainer>
//                 {convertedReleaseDate.format("YYYY")} &middot;
//                 <RuntimeContainer>
//                   <RuntimeIcon />
//                   {convertedRuntime} &middot;
//                 </RuntimeContainer>
//                 <RatingContainer>
//                   <RatingIcon />
//                   {movie.details.vote_average}
//                 </RatingContainer>
//               </SubTextContainer>

//               {/* <SubText>
//                 {movie.details.genres
//                   .map(item => {
//                     let arr = [];
//                     arr.push(item.name);
//                     return arr;
//                   })
//                   .slice(0, 3)
//                   .join(", ")}
//               </SubText> */}

//               <MobilePlot>{movie.overview}</MobilePlot>
//               <ButtonContainer>
//                 <TrailerButton
//                   urlKey={
//                     movie.details.videos.results &&
//                     movie.details.videos.results[0].key
//                   }
//                 />

//                 <FavoriteButton movie={movie} />
//               </ButtonContainer>
//               {/* <DetailTitle>
//                  <a
//                   href={`https://www.imdb.com/title/${movie.details.imdb_id}`}
//                 >
//                   <i className="fab fa-imdb fa-2x"></i>
//                 </a>
//               </DetailTitle> */}
//             </MobileDetails>
//           </MobileContainer>

//           {/* </TabPanel> */}
//           <Tab2Container
//             value={value}
//             index={1}
//             posterPath={posterURL + movie.poster_path}
//           >
//             <Tab2Details>
//               <MobilePlot>{movie.overview}</MobilePlot>
//             </Tab2Details>
//           </Tab2Container>
//           {/* <MobileContainer  //! Reserved For Cast & Crew Implementation
//             value={value}
//             index={2}
//             posterPath={posterURL + movie.poster_path}
//           ></MobileContainer> */}
//         </SwipeableViews>
//       </>
//     )}
//   </>
// );
// };

//   );
// };

// export default FullMoviePage;

// <LeftContainer>
// {/* <Poster src={posterURL + movie.poster_path}></Poster> */}
// {movie.details.tagline && (
//   <TaglineText>{movie.details.tagline}.</TaglineText>
// )}

// <a href={`https://www.imdb.com/title/${movie.details.imdb_id}`}>
//   {/* <i className="fab fa-imdb fa-2x"></i> */}
// </a>
// <Trailer
//   urlKey={
//     movie.details.videos.results &&
//     movie.details.videos.results[0].key
//   }
// />
// <button onClick={handleAddFavorite}></button>
// {/* <AddFavoriteButton movie={movie}>Add to Favorites</AddFavoriteButton> */}

// {/* Above, only the release date, rating (IMDB), and IMDB Link */}
// </LeftContainer>
// <CenterContainer>
// <MovieTitle>{movie.title}</MovieTitle>
// <Text>
//   {movie.details.genres
//     .map(item => {
//       let arr = [];
//       arr.push(item.name);
//       return arr;
//     })
//     .join(", ")}
// </Text>
// <MoviePlot>{movie.overview}</MoviePlot>
// {/* <CastContainer>
// !! Make A button
// <Cast style={{ flexDirection: "row" }} cast={creditsData.cast} />
// <ExpandButton
// buttonTitle="Cast"
// onClick={() =>
// setCreditsData(prevState => ({
// ...prevState,
// castToggle: !prevState.castToggle
// }))
// }
// />
// {creditsData.castToggle && castData}
// </CastContainer> */}
// <BottomContainer>
//   <DetailContainer>
//     <DetailTitle>Director:</DetailTitle>
//     {/* {creditsData.crew.director && (
// <Text>{creditsData.crew.director.name}</Text>
// )} */}
//   </DetailContainer>
//   <DetailContainer>
//     <DetailTitle>Composer:</DetailTitle>
//     {/* {creditsData.crew.composer && (
// <Text>{creditsData.crew.composer.name}</Text>
// )} */}
//   </DetailContainer>
//   <DetailContainer>
//     <DetailTitle>Screenplay:</DetailTitle>
//     {/* {creditsData.crew.writers && (
// <Text>
// {creditsData.crew.writers.map(person => person.name).join(", ")}
// </Text>
// )} */}
//   </DetailContainer>
//   <DetailContainer>
//     <DetailTitle>Budget:</DetailTitle>
//     {movie.details.budget === 0 ? (
//       <Text>Not Available</Text>
//     ) : (
//       <Text> {"$ " + movie.details.budget.toLocaleString()}</Text>
//     )}
//   </DetailContainer>
//   <DetailContainer>
//     <DetailTitle>Release Date:</DetailTitle>
//     <Text>{movie.release_date}</Text>
//   </DetailContainer>
// </BottomContainer>
// <DownArrow></DownArrow>
// </CenterContainer>

/* <AnotherDiv>      //! FOR IMPLEMENTING SCORLLING!
    //   <div>
    //     <Link
    //       activeClass="active"
    //       to="test1"
    //       spy={true}
    //       smooth={true}
    //       offset={50}
    //       duration={500}
    //       onSetActive={this.handleSetActive}
    //     >
    //       Test 1
    //     </Link>
    //     <Link
    //       activeClass="active"
    //       to="test1"
    //       spy={true}
    //       smooth={true}
    //       offset={50}
    //       duration={500}
    //       delay={1000}
    //     >
    //       Test 2 (delay)
    //     </Link>
    //     <Link
    //       className="test6"
    //       to="anchor"
    //       spy={true}
    //       smooth={true}
    //       duration={500}
    //     >
    //       Test 6 (anchor)
    //     </Link>
    //     <Button
    //       activeClass="active"
    //       className="btn"
    //       type="submit"
    //       value="Test 2"
    //       to="test2"
    //       spy={true}
    //       smooth={true}
    //       offset={50}
    //       duration={500}
    //     >
    //       Test 2
    //     </Button>

    //     <Element name="test1" className="element">
    //       test 1
    //     </Element>

    //     <Element name="test2" className="element">
    //       test 2
    //     </Element>

    //     <div id="anchor" className="element">
    //       test 6 (anchor)
    //     </div>

    //     <Link to="firstInsideContainer" containerId="containerElement">
    //       Go to first element inside container
    //     </Link>

    //     <Link to="secondInsideContainer" containerId="containerElement">
    //       Go to second element inside container
    //     </Link>
    //     <div className="element" id="containerElement">
    //       <Element name="firstInsideContainer">
    //         first element inside container
    //       </Element>

    //       <Element name="secondInsideContainer">
    //         second element inside container
    //       </Element>
    //     </div>

    //     <a onClick={this.scrollToTop}>To the top!</a>
    //     <br />
    //     <a onClick={this.scrollToBottom}>To the bottom!</a>
    //     <br />
    //     <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
    //     <br />
    //     <a onClick={this.scrollMore}>
    //       Scroll 100px more from the current position!
    //     </a>
    //   </div>
    //   );
    // </AnotherDiv> */

// old mobile code
// <div className="container">

//   {/* <div>
//     {isLoading ? (
//       "Loading Placeholder"
//     ) : ( */}
//   <div>
//     <div>
//       {/* <img
//       className="top-image"
//       src={posterURL + movie.backdrop_path}
//       alt={`${movie.title} + " backdrop"`}
//     /> */}
//       <h1 className="title-text">{movie.title}</h1>
//       {/* <Link to="/">Temp Back Link</Link> */}
//     </div>
//     <div className="info-container">
//       <h3>"{movie.details.tagline}"</h3>

//       <div className="cast-container">
//         {/* <ExpandButton
//           buttonTitle="Cast"
//           onClick={() =>
//             setCreditsData(prevState => ({
//               ...prevState,
//               castToggle: !prevState.castToggle
//             }))
//           }
//         />
//         {creditsData.castToggle && castData} */}
//       </div>
//       <p>
//         Plot: <br /> {movie.overview}
//       </p>
//       <div className="footer-details">
//         {/* <ExpandButton
//         buttonTitle="Director"
//         onClick={() => {
//           return (
//             <div>
//               {creditsData.crew.name}
//               <img
//                 src={tempPersonURL + creditsData.crew.profile_path}
//               ></img>
//             </div>
//           );
//         }}
//       /> */}
//         <p>
//           Release Date: <br />
//           {movie.release_date}
//         </p>
//         <p>
//           Budget:
//           <br /> {"$ " + movie.details.budget.toLocaleString()}
//         </p>
//         <a href={`https://www.imdb.com/title/${movie.details.imdb_id}`}>
//           <i className="fab fa-imdb fa-2x"></i>
//         </a>
//       </div>
//     </div>
//   </div>
// </div>
