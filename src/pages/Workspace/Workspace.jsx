import React from 'react';

import Note from '../../components/Note';
import { WorkContainer } from '../../components/Note/styles';
import SideReader from '../../components/SideReader';

function Workspace({ summit }) {
  return (
    <WorkContainer>
      <SideReader side="left" />
      <Note summit={summit} />
      <SideReader side="right" />
    </WorkContainer>
  );
}

export default Workspace;
