import React from "react";
import ReactDOM from "react-dom";
<<<<<<< Updated upstream
// import { BrowserRouter } from "react-router-dom";
=======
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
>>>>>>> Stashed changes

import App from "./components/App";
import reducers from "./reducers";

<<<<<<< Updated upstream
ReactDOM.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <App />,
  // </BrowserRouter>,
=======
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
>>>>>>> Stashed changes
  document.querySelector("#root")
);
