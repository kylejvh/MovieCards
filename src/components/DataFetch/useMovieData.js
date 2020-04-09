import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// The goal of this component was to create a reusable custom hook to fetch data throughout the app.

// ! if this is composed properly, useeffect should run every time there is a change in url. so the url can be external, and the url should have the page data plugged in.

const useMovieData = (myUrl, singleRequest) => {
  const [data, setData] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState(myUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios.get(url);

        if (singleRequest) {
          // If param for single request is passed in, additional request is not necessary and won't be made.
          console.log(response.data, "a single request, done.");
          setData(response.data);
          setImages(response.data.images);
          setVideos(response.data.videos);
          setCredits(response.data.credits);
        } else {
          // Gets response, makes request to grab additional details for each movie, appends details to each movie object.
          await Promise.all(
            response.data.results.map(async movie => {
              const responseDetails = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&&language=en-US`
              );
              movie.details = responseDetails.data;
            })
          );
          console.log("does this run?");
          setData(response.data.results);
        }

        // const fetchData = async () => {
        //   try {
        //     const response = await axios.get(url);

        //     if (singleRequest) {
        //       console.log(response.data, "a single request, done.");
        //       setSingleMovie(response.data);
        //       setIsLoading(false);
        //     } else {
        //       await Promise.all(
        //         response.data.results.map(async movie => {
        //           const responseDetails = await axios.get(
        //             `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&&language=en-US&append_to_response=videos,images&include_image_language=en,null`
        //           );
        //           movie.details = responseDetails.data;
        //         })
        //       );
        //       console.log("does this run?");
        //       setData(response.data.results);
        //     }

        // Gets response, makes request to grab additional details for each movie, appends details to each movie object.

        // Logic below will check if you want to make a bulk detail request for all results or a single isolated request for Full Page movie data.

        // Gets response, makes request to grab additional details for each movie, appends details to each movie object.

        // if (singleRequest) {
        //   await Promise.all(
        //     (async initialResponse => {
        //       const responseDetails = await axios.get(
        //         `https://api.themoviedb.org/3/movie/${initialResponse.data.id}?api_key=${API_KEY}&&language=en-US&append_to_response=credits,details,videos,images&include_image_language=en,null`
        //       );
        //       let finalResponse = {
        //         ...initialResponse.data,
        //         ...responseDetails.data
        //       };
        //       console.log(finalResponse, "what is");
        //       setData(finalResponse);
        //     })(initialResponse)
        //   );
        // } else {
        //   await Promise.all(
        //     initialResponse.data.results.map(async movie => {
        //       const responseDetails = await axios.get(
        //         `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&&language=en-US`
        //       );
        //       movie.details = responseDetails.data;
        //     })
        //   );

        //   setData(initialResponse.data.results);
        // }
      } catch (error) {
        setIsError(true);
        console.error("%cData Fetching Error:", "font-size: 18px", error);
      }

      setIsLoading(false); // Should trigger loading spinner, or throw error if axios request fails.
    };

    fetchData();
  }, [url, singleRequest]);

  return [{ data, videos, images, credits, isLoading, isError }, setUrl];
};

export default useMovieData;
