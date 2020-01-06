import React from 'react';

import {
  BodyContainer,
  HeaderContainer,
  Container,
  Left,
  Center,
  Right
} from './styles';

const Note = ({ summit }) => {
  return (
    <Container>
      <Left />
      <Center>
        <HeaderContainer>
          <h1>{summit.title}</h1>
        </HeaderContainer>
        <BodyContainer>
          <p>{summit.body}</p>
        </BodyContainer>
      </Center>
      <Right />
    </Container>
  );
};

export default Note;
