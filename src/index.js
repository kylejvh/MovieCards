import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { createGlobalStyle } from "styled-components";

import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    @import url("https://fonts.googleapis.com/css?family=Titillium+Web:400, 600i&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
    /* font-family: "Nunito", sans-serif; */
    background-color: #2c3949;
  font-family: "Titillium Web";  
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.querySelector("#root")
);
