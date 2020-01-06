import styled from 'styled-components';

export const HeaderContainer = styled.div`
  padding: 64px 32px;
  width: 100%;
  height: 25%;

  h1 {
    color: #000;
    font-size: 32mpx;
    font-weight: bold;
  }
`;

export const BodyContainer = styled.div`
  padding: 16px;
  p {
    color: #000;
    font-size: 16px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  height: 100vh;
`;

export const Column = styled.div`
  flex-grow: 1;
`;

export const Left = styled(Column)``;

export const Right = styled(Column)``;

export const Center = styled(Column)`
  border: 1px solid palegrey;
  background: white;
  flex-grow: 2;
  border-radius: 5px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  overflow: scroll;
`;
