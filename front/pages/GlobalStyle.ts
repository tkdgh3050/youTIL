import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans KR", sans-serif, "Arial", sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
