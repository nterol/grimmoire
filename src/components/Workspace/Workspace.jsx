import React from 'react';

import Note from './Note';
import { WorkContainer, Left, Right } from './styles';

function Workspace({ summit }) {
  return (
    <WorkContainer>
      <Left />
      <Note summit={summit} />
      <Right />
    </WorkContainer>
  );
}

export default Workspace;
