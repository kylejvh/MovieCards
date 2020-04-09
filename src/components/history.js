import { createBrowserHistory } from "history";

// deployment
const history = createBrowserHistory({ basename: "/MovieCards" });

export default process.env.NODE_ENV === "development"
  ? createBrowserHistory()
  : history;
