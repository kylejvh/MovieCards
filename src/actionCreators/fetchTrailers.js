import {
  FETCH_TRAILERS_INITIATED,
  FETCH_TRAILERS_FAILED,
  FETCH_TRAILERS_SUCCEEDED,
} from "./types";

import { YOUTUBE_API_KEY } from "../apis/youtube/key";
import youtube from "../apis/youtube/youtube";

export const fetchTrailers = (trailerIds) => async (dispatch) => {
  dispatch({ type: FETCH_TRAILERS_INITIATED });

  try {
    const response = await youtube.get("/videos", {
      params: {
        id: trailerIds,
        part: "snippet,contentDetails,statistics",
        key: YOUTUBE_API_KEY,
      },
    });

    dispatch({ type: FETCH_TRAILERS_SUCCEEDED, payload: response.data.items });
  } catch (error) {
    dispatch({ type: FETCH_TRAILERS_FAILED });
    console.error("%cData Fetching Error:", "font-size: 18px", error);
  }
};
