import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing:   border-box;
  }

  body {
    font-family:  "Noto Sans KR", sans-serif, "Arial", sans-serif;
    line-height:  1.5;
    border:       0;
    margin:       0;
  }

  :root {
    /* color */
    --color-primary:        #b71c1c;
    --color-primary-light:  #ff6659;
    --color-primary-dark:   #9a0007;
    --color-secondary:      #d89287;
    --color-secondary-light:#ffc3b7;
    --color-secondary-dark: #a5645a;
    --color-third:          #A0A8DF;
    --color-black:          #000000;
    --color-white:          #ffffff;
    --color-gray:           #757575;
    --color-gray-light:     #eeeeee;

    /* font size */
    --font-size-xs:   6px;
    --font-size-s:    10px;
    --font-size-ms:   14px;
    --font-size-m:    18px;
    --font-size-ml:   24px;
    --font-size-l:    32px;
    --font-size-xl:   40px;
    --font-size-xxl:  48px;
    
    /* padding size */
    --padding-size-s: 6px;
    --padding-size-m: 16px;
    --padding-size-l: 40px;
  }

  a {
    text-decoration: none;
    color: var(--color-black);
  }

  a.white {
    color: var(--color-white);
  }


  hr {
    margin: 0 var(--padding-size-m);
    border-color: var(--color-gray-light);
  }

  ul:not( article * ), li:not( article * ) {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const RoutesWrapper = styled.div`
  min-height: 74vh;
  padding: var(--padding-size-m);
`;
