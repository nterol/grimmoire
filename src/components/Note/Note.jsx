import React from 'react';

import { Center } from './styles';
import WriterBlock from '../WriterBlock';

const Note = ({ summit }) => {
  return (
    <Center>
      <WriterBlock note={summit} />
    </Center>
  );
};

export default Note;
