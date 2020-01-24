import React from 'react';

import { H1 } from './styles';

function H1Block({ attributes, children }) {
  return <H1 {...attributes}>{children}</H1>;
}

export default H1Block;
