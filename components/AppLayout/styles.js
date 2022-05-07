import css from "styled-jsx/css"
import { breakpoints, colors, fonts } from "../../styles/theme"

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${colors.primary}44 1px, transparent 1px),
      radial-gradient(${colors.primary}44 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      background: #fff;
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
