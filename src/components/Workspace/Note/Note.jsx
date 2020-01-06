import React from 'react';

import { BodyContainer, HeaderContainer, Center } from '../styles';

const Note = ({ summit }) => {
  return (
    <Center>
      <HeaderContainer>
        <h1>{summit.title}</h1>
      </HeaderContainer>
      <BodyContainer>
        <p>{summit.body}</p>
      </BodyContainer>
    </Center>
  );
};

export default Note;
