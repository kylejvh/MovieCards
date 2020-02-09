import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Helper/Loader";

const MovieDetail = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const url = `https://api.themoviedb.org/3/movie/475557?api_key=${API_KEY}&&language=en-US&append_to_response=videos,images,credits`;

  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let source = axios.CancelToken.source();
  const singleRequest = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(url, { cancelToken: source.token });

      setVideos(result.data.videos);
      setImages(result.data.images);
      setCredits(result.data.credits);

      console.log(result.data, "new data fetch...");
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Singe Request Cancelled");
      } else {
        setIsError(true);
        throw error;
      }
    }
    console.log(videos);
    console.log(images);
    console.log(credits);
    setIsLoading(false);
  };

  useEffect(() => {
    singleRequest();

    return () => {
      source.cancel();
    };
  }, []);

  let content;
  if (isError) {
    content = <div>Error Occurred</div>;
  } else if (videos.results) {
    content = (
      <ul>
        {videos.results.map(video => (
          <li key={video.id}>{video.name}</li>
        ))}
      </ul>
    );
  } else {
    content = <Loader />;
  }

  return (
    <div>
      <div>App</div>

      <div>{movie.title}</div>
      {content}
    </div>
  );
};

export default MovieDetail;
