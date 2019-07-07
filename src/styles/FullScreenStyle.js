import { createGlobalStyle } from 'styled-components';

const FullScreenStyle = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
  }
`

export default FullScreenStyle;
