import React from 'react';

import { BodyContainer, HeaderContainer, Center } from './styles';
import Editor from '../Editor';

const Note = ({ summit }) => {
  return (
    <Center>
      {/* <HeaderContainer>
        <h1>{summit.title}</h1>
      </HeaderContainer>
      <BodyContainer>
        <p>{summit.body}</p>
      </BodyContainer> */}
      <Editor note={summit} />
    </Center>
  );
};

export default Note;
