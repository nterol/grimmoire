import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme: { palette } }) => palette.bg};
`;

export const Flex = styled.div`
  display: flex;
`;

export const Row = styled(Flex)`
  flex-direction: row;
`;

export const Col = styled(Flex)`
  flex-direction: column;
`;

export const ColG1 = styled.div`
  flex-grow: 1;
`;
