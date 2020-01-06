import styled from "styled-components";
import palette from "../theme";


export const Container = styled.div`
  color: ${palette.sombre};
  height: 100%;
  width: ${props => (props.reduce ? 40 : 200)}px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${palette.bg};
  overflow-x: hidden;
  padding-top: 20px;
`;

export const Logo = styled.h1`
  color: ${palette.sombre};
  font-size: 32px;
  font-weight: bold;
  a {
    text-decoration: none;

    &:visited {
      color: ${palette.sombre}
    }
  }
`;
