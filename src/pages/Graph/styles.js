import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const SVG = styled.svg`
  position: relative;
  background-color: ${({ theme: { palette } }) => palette.bg};
`;
