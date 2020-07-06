import { VIDEO_CLICKED } from "./types";

export const onVideoSelect = (video) => {
  console.log("vid triggered...");
  return { type: VIDEO_CLICKED, payload: video };
};
