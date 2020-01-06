import React from 'react';

import Edge from './Edge';

const Edges = ({ edges }) =>
  edges.map(edge => <Edge key={edge.id} edge={edge} />);

export default Edges;
