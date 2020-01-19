import styled from 'styled-components';

export const Container = styled.div`
  color: ${props => props.theme.palette.sombre};
  height: 100%;
  width: ${props => (props.reduce ? 40 : 200)}px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.palette.bg};
  overflow-x: hidden;
  padding-top: 20px;
`;

export const Logo = styled.h1`
  color: ${props => props.theme.palette.blue};
  font-size: 32px;
  font-weight: bold;
  a {
    text-decoration: none;
  }
  a:visited,
  a:active {
    color: ${props => props.theme.palette.blue};
  }
`;
