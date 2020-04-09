import axios from "axios";

import { YOUTUBE_API_KEY } from "./key";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
